using coach_ticket_booking_api.DTOs.Payment;

namespace coach_ticket_booking_api.Services.Payment
{
    public interface IVnPayService
    {
        string CreatePaymentUrl(PaymentInformationModel model, HttpContext context);
        PaymentResponseModel PaymentExecute(IQueryCollection collections);
    }
}
