using coach_ticket_booking_api.DTOs.Route;

namespace coach_ticket_booking_api.Extensions
{
    public static class RouteExtentions
    {
        public static Models.Route ToEntity(this RouteDto dto)
        {
            return new Models.Route
            {
                Id = dto.Id,
                FromOfficeID = dto.FromOfficeID,
                ToOfficeID = dto.ToOfficeID,
                CreateDate = dto.CreateDate,
                Status = dto.Status,
                // Convert other properties here
            };
        }

        public static Models.Route ToEntity(this RouteCreateDto dto)
        {
            return new Models.Route
            {
                FromOfficeID = dto.FromOfficeID,
                ToOfficeID = dto.ToOfficeID,
                Status = dto.Status,
                // Convert other properties here
            };
        }

        public static RouteCreateDto ToCreateDto(this Models.Route route)
        {
            return new RouteCreateDto
            {
                FromOfficeID = route.FromOfficeID,
                ToOfficeID = route.ToOfficeID,
                Status = route.Status,
                // Convert other properties here
            };
        }

        public static RouteDto ToDto(this Models.Route route)
        {
            return new RouteDto
            {
                Id = route.Id,
                FromOfficeID = route.FromOfficeID,
                ToOfficeID = route.ToOfficeID,
                CreateDate = route.CreateDate,
                Status = route.Status,
                // Convert other properties here
            };
        }
    }
}
