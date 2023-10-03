using coach_ticket_booking_api.DTOs.Address;
using coach_ticket_booking_api.Enums;
using coach_ticket_booking_api.Models;

namespace coach_ticket_booking_api.DTOs.Account
{
    public class UserInforDto
    {
        public Guid Id { get; set; }
        public UserStatus Status { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public UserGender? Gender { get; set; }
        public DateTime? Birthday { get; set; }
        public ICollection<AddressDto> Addresses { get; set; } = new HashSet<AddressDto>();
    }
}
