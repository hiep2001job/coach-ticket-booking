using coach_ticket_booking_api.Data;
using coach_ticket_booking_api.DTOs.Account;
using coach_ticket_booking_api.DTOs.Address;
using coach_ticket_booking_api.DTOs.Booking;
using coach_ticket_booking_api.Helper.RequestHelpers;
using coach_ticket_booking_api.Models;
using Mailjet.Client.Resources;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Security.Claims;

namespace coach_ticket_booking_api.Controllers
{

    public class AccountsController : BaseApiController
    {
        private readonly UserManager<Models.User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly AppDbContext _context;

        public AccountsController(UserManager<Models.User> userManager, RoleManager<Role> roleManager, AppDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
        }

        [Authorize]
        [HttpGet("info")]
        public async Task<ActionResult<UserInforDto>> GetUserInfo()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _context.Users.Where(u => u.Id == Guid.Parse(userId))
                .Include(u => u.Addresses).FirstAsync();
            return Ok(new UserInforDto
            {
                Email = user.Email,
                Addresses = user.Addresses.Select(a => new AddressDto { Content = a.Content, Id = a.Id, IsPrimary = a.IsPrimary, Name = a.Name }).ToList(),
                Id = user.Id,
                Phone = user.PhoneNumber,
                Gender = user.Gender,
                Birthday = user.Birthday,
                Status = user.Status,
                Fullname = user.Fullname ?? "User Default Fullname"
            }) ;
        }

        [Authorize]
        [HttpPost("update-info")]
        public async Task<IActionResult> UpdateInfor([FromBody] UserInfoUpdateDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId != model.Id.ToString()) return BadRequest();

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound("User not found");
            }

            user.Fullname = model.Fullname;
            user.Email = model.Email;
            user.Gender = model.Gender;
            user.Birthday = model.Birthday;

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return CreatedAtAction(nameof(GetUserInfo),new {});
            }
            else
            {
                // Password change failed.
                return BadRequest(result.Errors);
            }
        }


        //[Authorize(Roles = "Admin")]
        [HttpGet("list")]
        public async Task<ActionResult<List<UserInforDto>>> GetAccounts(
        string roleName,     // Role name to filter users by role.
        string? searchQuery, // Search query for email, name, or phone.
        int page = 1,       // Page number (default is 1).
        int pageSize = 10   // Number of items per page (default is 10).
)
        {
            // Check if the role exists.
            var role = await _roleManager.FindByNameAsync(roleName);
            if (role == null)
            {
                return NotFound($"Role '{roleName}' not found.");
            }

            // Get the users who belong to the role.
            var usersInRole = await _userManager.GetUsersInRoleAsync(roleName);

            // If you need to work with an IQueryable, you can convert the list of users to an IQueryable.
            var usersQueryable = usersInRole.AsQueryable();

            // Filter users based on the search query (email, name, or phone).
            if (!string.IsNullOrEmpty(searchQuery))
            {
                usersQueryable = usersQueryable.Where(user =>
                    (user.NormalizedEmail != null && user.NormalizedEmail.Contains(searchQuery)) ||
                    (user.UserName != null && user.UserName.Contains(searchQuery, StringComparison.OrdinalIgnoreCase)) ||
                    (user.PhoneNumber != null && user.PhoneNumber.Contains(searchQuery, StringComparison.OrdinalIgnoreCase))
                );
            }

            // Calculate the total number of items and pages for paging.
            int totalCount = usersQueryable.Count();
            int totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

            // Apply paging to the filtered user list.
            usersQueryable = usersQueryable.Skip((page - 1) * pageSize).Take(pageSize);

            // You can map the user data or return it as is along with pagination information.
            var result = new
            {
                TotalCount = totalCount,
                TotalPages = totalPages,
                CurrentPage = page,
                PageSize = pageSize,
                Users = usersQueryable.Select(u => new UserInforDto
                                      {
                                          Addresses = u.Addresses.Select(a => new AddressDto { Content = a.Content, Id = a.Id, IsPrimary = a.IsPrimary, Name = a.Name }).ToList(),
                                          Birthday = u.Birthday,
                                          Gender = u.Gender,
                                          Email = u.Email,
                                          Id = u.Id,
                                          Phone = u.PhoneNumber
                                      }).ToList()
            };

            return Ok(result);
        }

    }
}
