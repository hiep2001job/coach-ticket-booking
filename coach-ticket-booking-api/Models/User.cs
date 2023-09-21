using Microsoft.AspNetCore.Identity;

namespace coach_ticket_booking_api.Models
{
    public class User:IdentityUser<int>
    {
        public string? RefreshToken { get; set; }
        public DateTime? TokenCreated { get; set; }
        public DateTime? TokenExpires { get; set; }
    }
}
