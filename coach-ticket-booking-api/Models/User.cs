using coach_ticket_booking_api.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace coach_ticket_booking_api.Models
{
    public class User:IdentityUser<Guid>
    {
        [DefaultValue(UserStatus.New)]
        public UserStatus Status { get; set; }
        //Authentication
        public string? RefreshToken { get; set; }
        public DateTime? TokenCreated { get; set; }
        public DateTime? TokenExpires { get; set; }

        //Otp
        public string? Otp { get; set; }
        public DateTime? OtpExpireTime { get; set; }
        public DateTime? LastTimeSendOtp { get; set; }
        public bool PhoneConfirmed { get; set; }

        public UserGender? Gender { get; set; }
        public DateTime? Birthday { get; set; }
        public string? Fullname { get; set; }

        public ICollection<Address> Addresses { get; set; } = new HashSet<Address>();
    }
}
