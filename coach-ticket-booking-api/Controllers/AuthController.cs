using AutoMapper.Internal;
using coach_ticket_booking_api.Data;
using coach_ticket_booking_api.DTOs;
using coach_ticket_booking_api.DTOs.Account;
using coach_ticket_booking_api.DTOs.Address;
using coach_ticket_booking_api.DTOs.Auth;
using coach_ticket_booking_api.Models;
using coach_ticket_booking_api.Services.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace coach_ticket_booking_api.Controllers
{
    [Authorize]
    public class AuthController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly TokenService _tokenService;
        private readonly AppDbContext _context;

        public AuthController(UserManager<User> userManager,SignInManager<User> signInManager, TokenService tokenService, AppDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _context = context;
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
                Status = Enums.UserStatus.New
            };
            // Set the security stamp

            var result = await _userManager.CreateAsync(user);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                };
                return ValidationProblem();

            }
            await _userManager.AddToRoleAsync(user, "CUSTOMER");
            return StatusCode(201);
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user= await _userManager.FindByIdAsync(userId);

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
