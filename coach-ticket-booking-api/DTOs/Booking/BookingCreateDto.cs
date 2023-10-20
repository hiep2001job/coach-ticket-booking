﻿using coach_ticket_booking_api.Enums;
using coach_ticket_booking_api.Models;

namespace coach_ticket_booking_api.DTOs.Booking
{
    public class BookingCreateDto
    {
        public Guid TripID { get; set; }
        public string? TransshipAddress { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public string CustomerEmail { get; set; }

        public virtual ICollection<BookingDetailCreateDto> BookingDetails { get; set; }
    }
}
