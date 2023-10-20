using coach_ticket_booking_api.DTOs.Trip;
using coach_ticket_booking_api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Globalization;
using System.Linq;
using Twilio.TwiML.Voice;

namespace coach_ticket_booking_api.Extensions
{
    public static class TripExtendsion
    {
        public static IQueryable<Trip> FilterTrips(this IQueryable<Trip> query, TripSearchDto tripSearchDto)
        {
            query = query
                .Include(t => t.Route)
                .ThenInclude(r => r.OfficesInRoute)
                .Include(t => t.Seats)

                .Where(t => t.DepartureDate.Date == tripSearchDto.DepartureDate.ToddMMyyyyDate())//search by departure date

                .Where(t => t.TripStatus == Enums.TripStatus.IN_PROGRESS) //is in progress
                                                                          //.Where(t => t.DepartureTime > DateTime.Now.AddDays(1)) //available before 24h
                .Where(
                    t =>
                    (t.Route.FromOfficeID == tripSearchDto.OriginOfficeId &&
                        t.Route.ToOfficeID == tripSearchDto.DestOfficeId) ||

                    (t.Route.FromOfficeID == tripSearchDto.OriginOfficeId &&
                        t.Route.OfficesInRoute.Select(o => o.OfficeID).Contains(tripSearchDto.DestOfficeId)) ||

                    (t.Route.ToOfficeID == tripSearchDto.DestOfficeId &&
                        t.Route.OfficesInRoute.Select(o => o.OfficeID).Contains(tripSearchDto.OriginOfficeId)) ||

                    (t.Route.OfficesInRoute.Select(o => o.OfficeID).Contains(tripSearchDto.OriginOfficeId) &&
                        t.Route.OfficesInRoute.Select(o => o.OfficeID).Contains(tripSearchDto.DestOfficeId))
                )//match search origin office and destination office  

                .Where(t => t.Seats.Where(s => s.Status == Enums.SeatStatus.Available).Count() >=
                        tripSearchDto.TicketCount);//available ticket nummber

            //filter with seattype
            if (tripSearchDto.SeatType!.Any())
            {
                query = query.Where(t => tripSearchDto.SeatType!.Contains((int)t.SeatType));
            }

            //filter with departure type
            if (tripSearchDto.DepartureType.Any())
            {
                query = query.Where(t => tripSearchDto.DepartureType.Contains((int)t.DepartureType));
            }

            //filter with floor
            if (tripSearchDto.Floor!.Any())
            {
                query = query.Where(t =>
                            (tripSearchDto.Floor!.Contains(0) &&
                                t.Seats.Any(s => s.Status == Enums.SeatStatus.Available && s.SeatName.StartsWith("B"))
                            ) ||//Top floor
                            (tripSearchDto.Floor!.Contains(1) &&
                                t.Seats.Any(s => s.Status == Enums.SeatStatus.Available && s.SeatName.StartsWith("A"))
                            )//Bottom floor
                );
            }

            //filter with seat line
            if (tripSearchDto.SeatLine != null && tripSearchDto.SeatLine.Any())
            {
                query = query.Where(t =>

                     //front lines 01-05
                     tripSearchDto.SeatLine.Contains(0) &&
                         t.Seats.Any(s => s.Status == Enums.SeatStatus.Available && s.SeatName.Substring(1).CompareTo("05") < 0) ||
                     //middle lines 06-11
                     tripSearchDto.SeatLine.Contains(1) &&
                         t.Seats.Any(s => s.Status == Enums.SeatStatus.Available && s.SeatName.Substring(1).CompareTo("06") > 0 &&
                             s.SeatName.Substring(1).CompareTo("11") < 0) ||
                     //tail lines 12-17
                     tripSearchDto.SeatLine.Contains(2) &&
                         t.Seats.Any(s => s.Status == Enums.SeatStatus.Available && s.SeatName.Substring(1).CompareTo("12") > 0)
                );
            }

            return query;
        }
    }
}
