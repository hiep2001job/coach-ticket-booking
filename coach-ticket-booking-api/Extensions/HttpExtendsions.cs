using coach_ticket_booking_api.Helper;
using System.Text.Json;

namespace coach_ticket_booking_api.Extensions
{
    public static class HttpExtendsions
    {
        public static void AddPaginationHeader(this HttpResponse response, MetaData metaData)
        {
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            response.Headers.Add("Pagination", JsonSerializer.Serialize(metaData, options));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");

        }
    }
}
