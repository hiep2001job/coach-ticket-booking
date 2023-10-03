using coach_ticket_booking_api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace coach_ticket_booking_api.Data
{
    public class DbInitializer
    {
        public static async Task Initialize(AppDbContext context, UserManager<User> userManager) {
            //var users = await userManager.Users.ToListAsync();
            //if (!userManager.Users.Any())
            //{
            //    var user = new User
            //    {
            //        UserName = "customerhiep",
            //        Email = "thanhhiep77777@gmail.com"
            //    };
            //    await userManager.CreateAsync(user, "hiep@123");
            //    await userManager.AddToRoleAsync(user, "Customer");

            //    var admin = new User
            //    {
            //        UserName = "adminhiep",
            //        Email = "hiepdc1996n512@vlvh.ctu.edu.vn"
            //    };
            //    await userManager.CreateAsync(admin, "hiep@123");
            //    await userManager.AddToRolesAsync(admin, new[] { "Customer", "Admin" });
            //}

            //context.SaveChanges();
        }
}
}
