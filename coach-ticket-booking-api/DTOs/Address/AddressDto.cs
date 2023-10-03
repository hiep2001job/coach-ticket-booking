namespace coach_ticket_booking_api.DTOs.Address
{
    public class AddressDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public bool IsPrimary { get; set; }
    }
}
