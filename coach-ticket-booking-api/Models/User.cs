using coach_ticket_booking_api.Enums;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace coach_ticket_booking_api.Models
{
    public class User:IdentityUser<Guid>
    {
        [DefaultValue(UserStatus.New)]
        public UserStatus Status { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? TokenCreated { get; set; }
        public DateTime? TokenExpires { get; set; }

        public UserGender? Gender { get; set; }
        public DateTime? Birthday { get; set; }
        public ICollection<Address> Addresses { get; set; } = new HashSet<Address>();
    }
}
