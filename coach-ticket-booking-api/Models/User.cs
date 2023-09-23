using coach_ticket_booking_api.Enums;
using Microsoft.AspNetCore.Identity;

namespace coach_ticket_booking_api.Models
{
    public class User:IdentityUser<Guid>
    {
        public UserStatus Status { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? TokenCreated { get; set; }
        public DateTime? TokenExpires { get; set; }
        public ICollection<Address> Addresses { get; set; } = new HashSet<Address>();
    }
}
