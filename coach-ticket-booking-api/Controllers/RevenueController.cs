using coach_ticket_booking_api.Data;
using coach_ticket_booking_api.DTOs.Booking;
using coach_ticket_booking_api.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace coach_ticket_booking_api.Controllers
{
    public class RevenueController:BaseApiController
    {
        private readonly AppDbContext _context;

        public RevenueController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult Index(
            [FromQuery] int? currentYear,
            [FromQuery] int? currentMonth,
            [FromQuery] int? viewType,
            [FromQuery] int? fromYear,
            [FromQuery] int? toYear
        )
        {
       

            #region View by years
            if (viewType == 1 || viewType == null)
            {
                var toYearToQuery = toYear ?? DateTime.Now.Year;
                var fromYearToQuery = fromYear ?? toYearToQuery - 10;
                var allYears = Enumerable.Range(fromYearToQuery, 12);

                var byYearsResult = allYears.GroupJoin(
                    _context.Bookings.Where(b => b.Status == BookingStatus.Completed)
                    .Where(o => 
                        (o.Trip.DepartureDate.Year >= fromYearToQuery || o.Trip.DepartureDate.Year <= toYearToQuery)
                        ),
                    year => year,
                    order => order.Trip.DepartureDate.Year,
                    (year, orders) => new
                    {
                        Year = year,
                        TotalIncome = orders.Sum(o => o.Cost),
                        Count = orders.Count()
                    }
                )
                 .ToDictionary(x => x.Year, x => new StatisticDto { Count = x.Count, TotalIncome = x.TotalIncome });

                foreach (var year in allYears.Except(byYearsResult.Keys))
                {
                    byYearsResult.Add(year, new StatisticDto { Count = 0, TotalIncome = 0 });
                }

                var byYearsResultWithKeyString = byYearsResult.ToDictionary(x => "Năm " + x.Key, x => x.Value).ToList();

                return Ok(byYearsResultWithKeyString);
            }
            #endregion

            #region View by time variants of a year

            #region By months
            if (viewType == 2)
            {
                int yearToQuery = currentYear ?? DateTime.Now.Year; // Replace with the desired year
                var allMonths = Enumerable.Range(1, 12);
                var resultByMonths = allMonths
                    .GroupJoin(
                        _context.Bookings.Where(b => b.Status == BookingStatus.Completed)
                        .Where(o => o.Trip.DepartureDate.Year == yearToQuery),
                        month => month,
                        order => order.Trip.DepartureDate.Month,
                        (month, orders) => new
                        {
                            Month = month,
                            TotalIncome = orders.Sum(o => o.Cost),
                            Count = orders.Count()
                        }
                    )
                     .ToDictionary(x => x.Month, x => new StatisticDto { Count = x.Count, TotalIncome = x.TotalIncome  });


                foreach (var month in allMonths.Except(resultByMonths.Keys))
                {
                    resultByMonths.Add(month, new StatisticDto { Count = 0, TotalIncome = 0 });
                }

                var resultByMonthsWithKeyString = resultByMonths.ToDictionary(x => "Tháng " + x.Key, x => x.Value).ToList();

                return Ok(resultByMonthsWithKeyString);

            }
            #endregion

            #region By Quater
            if (viewType == 3)
            {
                int yearToQuery = currentYear ?? DateTime.Now.Year; // Replace with the desired year
                var allQuaters = Enumerable.Range(1, 4);
                var resultByQuaters = allQuaters
                    .GroupJoin(
                        _context.Bookings.Where(b => b.Status == BookingStatus.Completed)
                        .Where(o =>  o.Trip.DepartureDate.Year == yearToQuery),
                        quater => quater,
                        order => (order.Trip.DepartureDate.Month - 1) / 3 + 1,
                        (month, orders) => new
                        {
                            Month = month,
                            TotalIncome = orders.Sum(o => o.Cost),
                            Count = orders.Count()
                        }
                    )
                     .ToDictionary(x => x.Month, x => new StatisticDto { Count = x.Count, TotalIncome = x.TotalIncome });


                foreach (var month in allQuaters.Except(resultByQuaters.Keys))
                {
                    resultByQuaters.Add(month, new StatisticDto { Count = 0, TotalIncome = 0 });
                }

                var resultByQuatersWithKeyString = resultByQuaters.ToDictionary(x => "Quý " + x.Key, x => x.Value).ToList();

                return Ok(resultByQuatersWithKeyString);

            }
            #endregion

            #region By days of a month
            if (viewType == 4)
            {
                int yearToQuery = currentYear ?? DateTime.Now.Year; // Replace with the desired year
                int monthToquery = currentMonth ?? DateTime.Now.Month;
                var allDays = Enumerable.Range(1, DateTime.DaysInMonth(yearToQuery, monthToquery));
                var resultDaysByMonth = allDays
                    .GroupJoin(
                        _context.Bookings.Where(b => b.Status == BookingStatus.Completed)
                        .Where(o => 
                                o.Trip.DepartureDate.Year == yearToQuery &&
                                o.Trip.DepartureDate.Month == monthToquery),
                        day => day,
                        order => order.Trip.DepartureDate.Day,
                        (month, orders) => new
                        {
                            Month = month,
                            TotalIncome = orders.Sum(o => o.Cost),
                            Count = orders.Count()
                        }
                    )
                     .ToDictionary(x => x.Month, x => new StatisticDto { Count = x.Count, TotalIncome = x.TotalIncome });


                foreach (var month in allDays.Except(resultDaysByMonth.Keys))
                {
                    resultDaysByMonth.Add(month, new StatisticDto { Count = 0, TotalIncome = 0 });
                }

                var resultDaysByMonthWithKeyString = resultDaysByMonth.ToDictionary(x => "Ngày " + x.Key, x => x.Value).ToList();

                return Ok(resultDaysByMonthWithKeyString);

            }
            #endregion
            #endregion
            return Ok("Thống kê có lỗi xảy ra");
        }
    }
}
