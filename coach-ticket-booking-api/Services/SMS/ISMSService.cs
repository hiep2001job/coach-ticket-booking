using Twilio.Rest.Api.V2010.Account;

namespace coach_ticket_booking_api.Services.SMS
{
    public interface ISMSService
    {
        MessageResource Send(string mobileNumber, string body);
 
    }
}
