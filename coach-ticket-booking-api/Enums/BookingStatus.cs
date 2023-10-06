
namespace coach_ticket_booking_api.Enums
{
    public enum BookingStatus
    {
        PaymentWaiting, //Chờ thanh toán
        Paid, // đã thanh toán
        Completed,// đã hoàn thành chuyến đi 
        PaymentExpired, //qúa hạn thanh toán
        Canceled // hủy vé
    }
}
