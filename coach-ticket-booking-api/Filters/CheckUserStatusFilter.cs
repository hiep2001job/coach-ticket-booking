using coach_ticket_booking_api.Data;
using coach_ticket_booking_api.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace coach_ticket_booking_api.Filters
{
    public class CheckUserStatusFilter : IAuthorizationFilter
    {
        private readonly AppDbContext _context;

        public CheckUserStatusFilter(AppDbContext context)
        {
            _context = context;
        }
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            // Access the User object from the HttpContext
            var user = context.HttpContext.User;
            var userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userStatus = _context.Users.Where(u => u.Id == Guid.Parse(userId!))
                .Select(u => u.Status)
                .FirstOrDefault();

            if (userStatus == UserStatus.New)
                context.Result = new BadRequestObjectResult("Vui lòng cập nhật thông tin cá nhân để thực hiện đặt vé!"); 
            if (userStatus == UserStatus.Inactive)
                context.Result = new BadRequestObjectResult("Tài khoản bị hạn chế. Vui lòng thử lại sau!");


        }
    }
}
