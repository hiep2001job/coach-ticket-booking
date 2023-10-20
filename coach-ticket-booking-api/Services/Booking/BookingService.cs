using coach_ticket_booking_api.Data;
using coach_ticket_booking_api.DTOs;
using coach_ticket_booking_api.DTOs.Booking;
using coach_ticket_booking_api.DTOs.Payment;
using coach_ticket_booking_api.Enums;
using coach_ticket_booking_api.Extensions;
using coach_ticket_booking_api.Jobs;
using coach_ticket_booking_api.Services.Payment;
using coach_ticket_booking_api.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Quartz.Impl;
using Quartz;
using System.Security.Claims;
using coach_ticket_booking_api.Models;
using coach_ticket_booking_api.DTOs.Email;
using coach_ticket_booking_api.Services.Mail;
using Mailjet.Client.Resources;

namespace coach_ticket_booking_api.Services.Booking
{
    public class BookingService : IBookingService
    {
        private readonly AppDbContext _context;
        private readonly IVnPayService _vnPayService;
        private readonly IMailService _mailService;
        private readonly HttpContext _httpContext;
        private readonly ClaimsPrincipal _user;

        public BookingService(AppDbContext context, IVnPayService vnPayService, IHttpContextAccessor httpContextAccessor, IMailService mailService)
        {
            _context = context;
            _vnPayService = vnPayService;
            _mailService = mailService;
            _httpContext = httpContextAccessor.HttpContext;
            _user = httpContextAccessor.HttpContext.User;
        }

        public async Task<ServiceResponseDto<BookingDto>> CreateBookingAsync(BookingCreateDto bookingCreate)
        {

            if (bookingCreate.BookingDetails == null || bookingCreate.BookingDetails.Count == 0)
                return new ServiceResponseDto<BookingDto> { IsSuccess = false, Message = "Booking details is empty" };

            var trip = await _context.Trips
                .Include(t => t.Seats)
                .Include(t => t.Route)
                    .ThenInclude(r => r.FromOffice)
                .Include(t => t.Route)
                    .ThenInclude(r => r.ToOffice)
                .FirstOrDefaultAsync(t => t.Id == bookingCreate.TripID);

            if (trip == null || trip.Seats.IsNullOrEmpty())
                return new ServiceResponseDto<BookingDto> { IsSuccess = false, Message = "Trip not found" };

            var booking = bookingCreate.ToEntity();

            //init booking 
            if (_user.Identity.IsAuthenticated)
            {
                var userId = _user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var user = await _context.Users.FindAsync(Guid.Parse(userId));
                if (user == null) return new ServiceResponseDto<BookingDto> { IsSuccess = false, Message = "User not found" };
                booking.UserID = Guid.Parse(userId!);
            }

            //set payment expire time
            booking.PaymentExpireTime = DateTime.Now.AddMinutes(30);

            //generate booking code 
            booking.BookingCode = StringGenerator.GenerateRandomString(6);

            booking.TicketNumber = bookingCreate.BookingDetails.Count;

            booking.Cost = booking.TicketNumber * trip.Price;

            booking.Status = BookingStatus.PaymentWaiting;

            //customer information
            booking.CustomerName = bookingCreate.CustomerName;
            booking.CustomerPhone = bookingCreate.CustomerPhone;
            booking.CustomerEmail = bookingCreate.CustomerEmail;

            //check all given seats are belong to the trip          

            var allSeatsBelongToTrip = booking.BookingDetails.All(bd => trip.Seats.Select(s => s.Id).Contains(bd.SeatID));
            if (!allSeatsBelongToTrip) return new ServiceResponseDto<BookingDto> { IsSuccess = false, Message = "Seats not belong to trip" };

            //check all given seats are available    
            var seatsInBooking = trip.Seats.Where(
                s => booking.BookingDetails.Select(bd => bd.SeatID).Contains(s.Id)
            ).ToList();

            var allSeatsAvailable = seatsInBooking.All(s => s.Status == SeatStatus.Available);
            if (!allSeatsAvailable) return new ServiceResponseDto<BookingDto> { IsSuccess = false, Message = "Seats not belong to trip" };

            foreach (var seat in seatsInBooking)
            {
                seat.Status = SeatStatus.Booked;
            }

            //Create booking
            var addedBooking = await _context.AddAsync(booking);

            _context.UpdateRange(seatsInBooking);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return new ServiceResponseDto<BookingDto> { IsSuccess = false, Message = "Failed to create booking" };

            //Create job scheduling for cancel when payment expired

            await CreateBookingCancelationSchedule(booking);

            var bookingDto = new BookingDto
            {
                Id = booking.Id,
                Email = booking.CustomerEmail,
                Fullname = booking.CustomerName,
                PhoneNumber = booking.CustomerPhone,
                Fee = booking.Fee,
                Cost = booking.Cost,
                TicketNumber = booking.TicketNumber,
                SeatNames = string.Join(",", seatsInBooking.Select(s => s.SeatName)),
                CreateDate = booking.CreateDate,
                PaymentExpireTime = booking.PaymentExpireTime,
                PaymentUrl = "",
                BookingCode = booking.BookingCode,
                DepartureDate = trip.DepartureDate,
                DepartureTime = trip.DepartureTime,
                ArrivalTime = trip.ArrivalTime,
                From = trip.Route.FromOffice.Name,
                To = trip.Route.ToOffice.Name,
                Price = trip.Price,
                TransshipAddress = booking.TransshipAddress,
                Status = booking.Status,
            };

            return new ServiceResponseDto<BookingDto> { Data = bookingDto };
        }

        private async Task CreateBookingCancelationSchedule(Models.Booking booking)
        {
            // Tạo Scheduler
            ISchedulerFactory schedulerFactory = new StdSchedulerFactory();
            IScheduler scheduler = await schedulerFactory.GetScheduler();

            // Đặt thông tin booking vào JobDataMap
            var jobData = new JobDataMap();

            jobData.Add("Booking", booking);

            // Tạo công việc và thiết lập trigger để chạy sau thời gian hết hạn thanh toán
            IJobDetail job = JobBuilder.Create<BookingCancellationJob>()
                .UsingJobData(jobData)
                .Build();

            ITrigger trigger = TriggerBuilder.Create()
                .StartAt(new DateTimeOffset(dateTime: (DateTime)(booking.PaymentExpireTime?.AddMinutes(-1))))
                .Build();

            // Đăng ký công việc và trigger với Scheduler
            await scheduler.ScheduleJob(job, trigger);

            // Khởi động Scheduler
            await scheduler.Start();
        }

        public async Task<ServiceResponseDto<string>> CreateBookingPayment(BookingPaymentCreateDto paymentCreateDto)
        {
            var booking = _context.Bookings.Where(b => b.BookingCode == paymentCreateDto.BookingCode).FirstOrDefault();
            if (booking == null || booking.Status != BookingStatus.PaymentWaiting)
                return new ServiceResponseDto<string> { IsSuccess = false, Message = "Invalid Booking" };
            //Create payment url
            var paymentModel = new PaymentInformationModel
            {
                Amount = booking.Cost,
                Name = booking.CustomerName,
                OrderDescription = $"Thanh toán đặt vé: {booking.BookingCode}",
                OrderType = "Đặt vé xe"
            };

            var paymentUrl = _vnPayService.CreatePaymentUrl(paymentModel, _httpContext);

            return new ServiceResponseDto<string> { Data = paymentUrl };

        }

        public async Task<ServiceResponseDto<string>> PaymentConfirmBooking(PaymentResponseModel payment)
        {
            if (!payment.Success) return new ServiceResponseDto<string> { IsSuccess = false, Message = "Payment error!" };

            var bookingCode = payment.OrderDescription.Split(' ')[^1];
            var booking = _context.Bookings
                .Include(b => b.User)
                .Include(b => b.Trip)
                    .ThenInclude(t => t.Route)
                        .ThenInclude(r => r.ToOffice)
                .Include(b => b.Trip)
                    .ThenInclude(t => t.Route)
                    .ThenInclude(r => r.FromOffice)
                .Include(b => b.BookingDetails)
                    .ThenInclude(bd => bd.Seat)
                .Select(booking => new BookingDto
                {
                    Id = booking.Id,
                    Email = booking.CustomerEmail,
                    Fullname = booking.CustomerName,
                    PhoneNumber = booking.CustomerPhone,
                    Fee = booking.Fee,
                    Cost = booking.Cost,
                    TicketNumber = booking.TicketNumber,
                    SeatNames = string.Join(",", booking.BookingDetails.Select(b => b.Seat.SeatName)),
                    CreateDate = booking.CreateDate,
                    PaymentExpireTime = booking.PaymentExpireTime,
                    BookingCode = booking.BookingCode,
                    DepartureDate = booking.Trip.DepartureDate,
                    DepartureTime = booking.Trip.DepartureTime,
                    ArrivalTime = booking.Trip.ArrivalTime,
                    From = booking.Trip.Route.FromOffice.Name,
                    To = booking.Trip.Route.ToOffice.Name,
                    Price = booking.Trip.Price,
                    TransshipAddress = booking.TransshipAddress,
                    Status = booking.Status,
                })
                .FirstOrDefault(b => b.BookingCode == bookingCode);

            if (booking == null) return new DTOs.ServiceResponseDto<string> { IsSuccess = false, Message = "Booking not found" };

            booking.Status = BookingStatus.Paid;

            _context.Update(booking);

            await _context.SaveChangesAsync();

            await SendSuccessBookingEmail(booking);

            return new ServiceResponseDto<string> { Message = "A confirm email has sent to customer!" };

        }

        private async Task SendSuccessBookingEmail(BookingDto booking)
        {
            var mail = new EmailWithTemplateDto
            {
                Subject = $"Mua vé thành công. Mã vé: {booking.BookingCode}",
                ToMail = booking.Email,
                ToName = booking.Fullname,
                TemplateId = 5131224,
                TemplateVariables = new Dictionary<string, object>
                {
                    { "CUSTOMER", booking.Fullname },
                    { "TICKETCODE", booking.BookingCode },
                    { "BOOKINGDATE", booking.CreateDate },
                    { "PAYMENT", "VNPAY" },
                    { "CONTACTNAME", booking.Fullname },
                    { "CONTACTEMAIL", booking.Email },
                    { "CONTACTPHONE", booking.PhoneNumber},
                    { "TRIPDEPARTURE", booking.From },
                    { "TRIPDESTINATION", booking.To },
                    { "DEPARTURETIME", booking.DepartureTime },
                    { "DEPARTUREDAY", booking.DepartureDate },
                    { "PREDEPARTURETIME", booking.DepartureTime.AddMinutes(-15) },
                    { "TICKETPRICE", booking.Price },
                    { "TICKETNUMBER", booking.TicketNumber },
                    { "TOTALPRICE", booking.TicketNumber* booking.Price },
                    { "DISCOUNT", 0 },
                    { "TOTALCOST", booking.Cost },
                }

            };
            var result = await _mailService.SendEmailWithTemplateAsync(mail);

        }
    }
}
