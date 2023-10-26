using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace coach_ticket_booking_api.Extensions
{
    public static class DateTimeExtendsions
    {
        public static DateTime? ToddMMyyyyDate(this string dateTime)
        {
            if (DateTime.TryParseExact(dateTime, "ddMMyyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime parsedDate))
                return parsedDate;
            return null;
        }
        public static int GetTimeRange(this DateTime dateTime)
        {
            int hour = dateTime.Hour;

            if (hour >= 0 && hour < 6)
            {
                return 0; // Sáng sớm 00:00 - 06:00
            }
            else if (hour >= 6 && hour < 12)
            {
                return 1; // Buổi sáng 06:00 - 12:00
            }
            else if (hour >= 12 && hour < 18)
            {
                return 2; // Buổi chiều 12:00 - 18:00
            }
            else
            {
                return 3; // Buổi tối 18:00 - 24:00
            }
        }
        public static double DateDiffInHours(this DateTime start, DateTime end)
        {
            TimeSpan timeDifference = end - start;
            return Math.Round(timeDifference.TotalHours, 1);
        }
    }
}
