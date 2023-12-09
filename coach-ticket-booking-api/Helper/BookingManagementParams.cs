namespace coach_ticket_booking_api.Helper
{
    public class BookingManagementParams:PaginationParams
    {
        public string? FromDate { get; set; }
        public string? ToDate { get; set; }
        public string? Phone { get; set; }
    }
}
