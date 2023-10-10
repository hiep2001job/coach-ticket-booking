using coach_ticket_booking_api.Enums;
using coach_ticket_booking_api.Models;
using Microsoft.AspNetCore.Identity;
using Quartz;

namespace coach_ticket_booking_api.Jobs
{
    public class UserDeletionJob : IJob
    {
        private readonly UserManager<User> _userManager;

        public UserDeletionJob(UserManager<User> userManager)
        {
            _userManager = userManager;
        }
        public async Task Execute(IJobExecutionContext context)
        {
            // Find user by userid from JobDataMap
            var userId = context.JobDetail.JobDataMap["UserId"] as string;
            var user=await _userManager.FindByIdAsync(userId);
            if (user == null) return;
        

            if (user.Status==UserStatus.New && !user.PhoneNumberConfirmed)
            {
               await _userManager.DeleteAsync(user);
            }
            else
            {
               
                await context.Scheduler.DeleteJob(context.JobDetail.Key);
            }
        }
    }
}
