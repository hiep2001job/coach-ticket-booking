﻿namespace coach_ticket_booking_api.Helper
{
    public class PaginationParams
    {
        private const int MaxPageSize = 50;

        private int _pageSize = 12;

        public int PageNumber { get; set; } = 1;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
        }
    }
}
