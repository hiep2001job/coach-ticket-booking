using coach_ticket_booking_api.Utils;

namespace coach_ticket_booking_api.Enums
{
    public enum TripDepartureType
    {
        [Description("Sáng sớm 00:00 - 06:00")]
        EARLY_MORNING,
        [Description("Buổi sáng 06:00 - 12:00")]
        MORNING,
        [Description("Buổi chiều 12:00 - 18:00")]
        AFTERNOON,
        [Description("Buổi tối 18:00 - 24:00")]
        EVENING
    }
}
