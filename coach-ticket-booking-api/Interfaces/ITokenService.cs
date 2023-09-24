using coach_ticket_booking_api.Models;

namespace coach_ticket_booking_api.Interfaces
{
    public interface ITokenService
    {
        RefreshToken GenerateRefreshToken();
        Task<string> GenerateToken(User user);
    }
}