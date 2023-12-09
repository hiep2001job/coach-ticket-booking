using coach_ticket_booking_api.Enums;

namespace coach_ticket_booking_api.DTOs.Account
{
    public class UserInfoUpdateDto
    {
        public Guid? Id { get; set; }
        public string Email { get; set; }
        public UserGender Gender { get; set; }
        public string? Birthday { get; set; }
        public string Fullname { get; set; }
    }
}
