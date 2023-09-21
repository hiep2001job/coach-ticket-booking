using coach_ticket_booking_api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace coach_ticket_booking_api.Data
{
    public class DbInitializer
    {
        public static async Task Initialize(AppContext context, UserManager<User> userManager) {
            var users = await userManager.Users.ToListAsync();
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "bob",
                    Email = "bob@gmail.com"
                };
                await userManager.CreateAsync(user, "Bob@123");
                await userManager.AddToRoleAsync(user, "Customer");

                var admin = new User
                {
                    UserName = "admin",
                    Email = "admin@gmail.com"
                };
                await userManager.CreateAsync(admin, "Admin@123");
                await userManager.AddToRolesAsync(admin, new[] { "Customer", "Admin" });
            }
            
            context.SaveChanges();
        }
}
}
