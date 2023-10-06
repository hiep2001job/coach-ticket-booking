namespace coach_ticket_booking_api.DTOs
{
    public class ServiceResponseDto<T>
    {
        public bool IsSuccess { get; set; } = true;
        public string Message { get; set; } = "";
        public T Data { get; set; }
    }
}
