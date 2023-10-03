using coach_ticket_booking_api.Data;
using coach_ticket_booking_api.DTOs.Office;
using coach_ticket_booking_api.DTOs.Route;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace coach_ticket_booking_api.Controllers
{
    public class RouteController:BaseApiController
    {
        private readonly AppDbContext _context;

        public RouteController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/routes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RouteDto>>> GetRoutes()
        {
            var routes = await _context.Route
                .Include(r => r.FromOffice)
                .Include(r => r.ToOffice)
                .Select(r => new RouteDto
                {
                    Id = r.Id,
                    FromOfficeID = r.FromOfficeID,
                    ToOfficeID = r.ToOfficeID,
                    CreateDate = r.CreateDate,
                    Status = r.Status,
                    FromOffice = new OfficeDto
                    {
                        // Map Office properties here
                    },
                    ToOffice = new OfficeDto
                    {
                        // Map Office properties here
                    }
                })
                .ToListAsync();

            return Ok(routes);
        }

        // GET: api/routes/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<RouteDto>> GetRoute(Guid id)
        {
            var route = await _context.Route
                .Include(r => r.FromOffice)
                .Include(r => r.ToOffice)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (route == null)
            {
                return NotFound();
            }

            var routeDto = new RouteDto
            {
                Id = route.Id,
                FromOfficeID = route.FromOfficeID,
                ToOfficeID = route.ToOfficeID,
                CreateDate = route.CreateDate,
                Status = route.Status,
                FromOffice = new OfficeDto
                {
                    // Map Office properties here
                },
                ToOffice = new OfficeDto
                {
                    // Map Office properties here
                }
            };

            return Ok(routeDto);
        }

        // POST: api/routes
        [HttpPost]
        public async Task<ActionResult<RouteDto>> CreateRoute(RouteCreateDto routeCreateDto)
        {
            var route = new Models.Route
            {
                FromOfficeID = routeCreateDto.FromOfficeID,
                ToOfficeID = routeCreateDto.ToOfficeID,
                Status = routeCreateDto.Status,
                // Set other properties as needed
            };

            _context.Route.Add(route);
            await _context.SaveChangesAsync();

            var createdRouteDto = new RouteDto
            {
                Id = route.Id,
                FromOfficeID = route.FromOfficeID,
                ToOfficeID = route.ToOfficeID,
                CreateDate = route.CreateDate,
                Status = route.Status,
                FromOffice = new OfficeDto
                {
                    // Map Office properties here
                },
                ToOffice = new OfficeDto
                {
                    // Map Office properties here
                }
            };

            return CreatedAtAction(nameof(GetRoute), new { id = route.Id }, createdRouteDto);
        }

        // PUT: api/routes/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRoute(Guid id, RouteCreateDto routeCreateDto)
        {
            var route = await _context.Route.FirstOrDefaultAsync(r => r.Id == id);

            if (route == null)
            {
                return NotFound();
            }

            // Update properties of the existing route entity with DTO values
            route.FromOfficeID = routeCreateDto.FromOfficeID;
            route.ToOfficeID = routeCreateDto.ToOfficeID;
            route.Status = routeCreateDto.Status;
            // Update other properties as needed

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/routes/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoute(Guid id)
        {
            var route = await _context.Route.FirstOrDefaultAsync(r => r.Id == id);

            if (route == null)
            {
                return NotFound();
            }

            _context.Route.Remove(route);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
