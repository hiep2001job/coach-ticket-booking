
namespace coach_ticket_booking_api.Enums
{
    public enum BookingStatus
    {
        PhoneBooked, // dành cho đặt qua điện thoại
        PaymentWaiting, //Chờ thanh toán
        Paid, // đã thanh toán
        Completed,// đã hoàn thành chuyến đi 
        Canceled // hủy vé
    }
}
