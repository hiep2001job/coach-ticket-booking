using coach_ticket_booking_api.Data;
using coach_ticket_booking_api.Enums;
using coach_ticket_booking_api.Models;
using Quartz;

namespace coach_ticket_booking_api.Jobs
{
    public class BookingCancellationJob : IJob
    {
        private readonly AppDbContext _context;

        public BookingCancellationJob(AppDbContext context)
        {
            _context = context;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            // Lấy booking từ JobDataMap (chứa thông tin booking)
            var booking = context.JobDetail.JobDataMap["Booking"] as Booking;

            if (booking == null)
            {
                // Không tìm thấy booking, không thể kiểm tra
                return;
            }

            if (booking.Status == BookingStatus.PaymentWaiting)
            {
                // Kiểm tra xem booking đã thanh toán chưa
                if (booking.PaymentExpireTime <= DateTime.Now)
                {
                    // Thời gian hết hạn thanh toán đã đến và booking chưa thanh toán
                    // Hủy booking và đặt trạng thái ghế là available
                    CancelBooking(booking);
                }
            }
            else
            {
                // Nếu đã thanh toán, hủy job (job không cần thiết)
                await context.Scheduler.DeleteJob(context.JobDetail.Key);
            }
        }

        private void CancelBooking(Booking booking)
        {
            // Hủy booking và đặt trạng thái ghế là available

            booking.Status = BookingStatus.PaymentExpired;
            var seats = booking.BookingDetails.Select(d => d.Seat);
            seats = seats.Select(s =>
                {
                    s.Status = SeatStatus.Available; 
                    return s;
                }
             );
            _context.UpdateRange(booking, seats);
            _context.SaveChanges();
           
        }
    }
}
