using AutoMapper.Internal;
using coach_ticket_booking_api.Data;
using coach_ticket_booking_api.DTOs;
using coach_ticket_booking_api.DTOs.Account;
using coach_ticket_booking_api.DTOs.Address;
using coach_ticket_booking_api.DTOs.Auth;
using coach_ticket_booking_api.Jobs;
using coach_ticket_booking_api.Models;
using coach_ticket_booking_api.Services.Auth;
using coach_ticket_booking_api.Services.SMS;
using coach_ticket_booking_api.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Quartz.Impl;
using Quartz;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace coach_ticket_booking_api.Controllers
{
    [Authorize]
    public class AuthController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly TokenService _tokenService;
        private readonly AppDbContext _context;
        private readonly ISMSService _smsService;

        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, TokenService tokenService, AppDbContext context, ISMSService smsService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _context = context;
            _smsService = smsService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.UserName);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                return Unauthorized();
            }

            //Create and set refreshtoken
            var refreshToken = _tokenService.GenerateRefreshToken();
            SetRefreshToken(refreshToken, user);

            await _context.SaveChangesAsync();

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
            };
        }

        [HttpPost("refresh-token")]
        [AllowAnonymous]
        public async Task<ActionResult<UserDto>> RefreshToken([FromBody] RefreshTokenRequestDto model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null)
            {
                return Unauthorized();
            }

            var refreshToken = Request.Cookies["refreshToken"];

            if (!user.RefreshToken!.Equals(refreshToken))
            {
                return Unauthorized("Invalid Refresh Token." + refreshToken);
            }
            else if (user.TokenExpires < DateTime.Now)
            {
                return Unauthorized("Token expired");
            }

            string token = await _tokenService.GenerateToken(user);
            var newRefreshToken = _tokenService.GenerateRefreshToken();
            SetRefreshToken(newRefreshToken, user);

            await _context.SaveChangesAsync();
            return new UserDto
            {
                Email = user.Email,
                Token = token,

            };

        }

        [AllowAnonymous]
        [HttpGet("is-phone-unique")]
        public async Task<IActionResult> IsPhoneNumberUnique(string phoneNumber)
        {
            var exists = await _userManager.FindByNameAsync(phoneNumber);
            return Ok(new { IsUnique = exists == null });
        }


        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var exists = await _userManager.FindByNameAsync(registerDto.Phone);
            if (exists != null) return BadRequest(new ProblemDetails { Title = "Số điện thoại đã được đăng kí" });

            var user = new User
            {
                UserName = registerDto.Phone,
                SecurityStamp = Guid.NewGuid().ToString(),
                Status = Enums.UserStatus.New,
                PhoneNumber = registerDto.Phone,
                Otp = StringGenerator.GenerateRandomDigitString(6),
                OtpExpireTime = DateTime.Now.AddMinutes(10),
                LastTimeSendOtp = DateTime.Now,

            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                };
                return ValidationProblem();

            }
            await _userManager.AddToRoleAsync(user, "CUSTOMER");

            var smsResult = _smsService.Send(user.PhoneNumber, $"Coach ticket booking mã otp của bạn là {user.Otp} có hiệu lực trong vòng 10 phút");

            //Schedule job that delete user if the user does not confirm phonenumber after 10 minutes
            await CreateUserDeletionSchedule(user.Id.ToString());

            return Ok(new { UserId = user.Id.ToString() });
        }

        private async Task CreateUserDeletionSchedule(string userId)
        {
            // Tạo Scheduler
            ISchedulerFactory schedulerFactory = new StdSchedulerFactory();
            IScheduler scheduler = await schedulerFactory.GetScheduler();

            // Đặt thông tin booking vào JobDataMap
            var jobData = new JobDataMap();

            jobData.Add("UserId", userId);

            // Tạo công việc và thiết lập trigger để chạy sau thời gian hết hạn thanh toán
            IJobDetail job = JobBuilder.Create<UserDeletionJob>()
                .UsingJobData(jobData)
                .Build();

            ITrigger trigger = TriggerBuilder.Create()
                .StartAt(new DateTimeOffset(dateTime: DateTime.Now.AddMinutes(10)))
                .Build();

            // Đăng ký công việc và trigger với Scheduler
            await scheduler.ScheduleJob(job, trigger);

            // Khởi động Scheduler
            await scheduler.Start();
        }

        [HttpPost("verify-register-otp")]
        [AllowAnonymous]
        public IActionResult VerifyRegisterOTP([FromBody] OtpVerificationDto otpVerification)
        {
            var user = _context.Users.Where(u => u.PhoneNumber == otpVerification.Phone).FirstOrDefault();
            if (user == null) return BadRequest("Invalid OTP");

            var isValidOtp = user.Otp == otpVerification.Otp && user.OtpExpireTime > DateTime.Now;
            if (!isValidOtp) return BadRequest("Invalid OTP");

            return Ok("Otp is valid");
        }


        [Authorize]
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound("User not found");
            }

            var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

            if (result.Succeeded)
            {
                // Password change was successful.
                // You can optionally sign the user out or perform other actions here.
                await _signInManager.SignOutAsync();

                return Ok("Password changed successfully");
            }
            else
            {
                // Password change failed.
                return BadRequest(result.Errors);
            }
        }

       

        private void SetRefreshToken(RefreshToken newRefreshToken, User user)
        {
            var cookieOptions = new CookieOptions
            {
                SameSite = SameSiteMode.None,
                Secure = true,
                IsEssential = true,
                HttpOnly = true,
                Expires = newRefreshToken.Expires,
            };
            Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);
            user.RefreshToken = newRefreshToken.Token;
            user.TokenCreated = newRefreshToken.Created;
            user.TokenExpires = newRefreshToken.Expires;
        }

    }
}
