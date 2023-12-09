using coach_ticket_booking_api.Data;
using coach_ticket_booking_api.DTOs.Office;
using coach_ticket_booking_api.DTOs.Route;
using coach_ticket_booking_api.Extensions;
using coach_ticket_booking_api.Helper;
using coach_ticket_booking_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Serilog;

namespace coach_ticket_booking_api.Controllers
{
    public class RouteController : BaseApiController
    {
        private readonly AppDbContext _context;
        private readonly ILogger<RouteController> _logger;

        public RouteController(AppDbContext context, ILogger<RouteController> logger)
        {
            _context = context;
            _logger = logger;
        }
        // GET: api/routes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RouteDto>>> GetRoutes([FromQuery] string? search)
        {
            var routes = _context.Route
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
                        Id = r.FromOfficeID,
                        Address = r.FromOffice.Address,
                        Name = r.FromOffice.Name,
                        TownName = r.FromOffice.Town.Name
                    },
                    ToOffice = new OfficeDto
                    {
                        Id = r.ToOfficeID,
                        Address = r.ToOffice.Address,
                        Name = r.ToOffice.Name,
                        TownName = r.ToOffice.Town.Name
                    }
                }).AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                routes = routes.Where(x => x.FromOffice.Name.Contains(search) || x.ToOffice.Name.Contains(search));
            }

            var result =await routes.ToListAsync();

            return Ok(result);
        }

        [HttpGet("paginated")]
        public async Task<ActionResult<PagedList<RouteDto>>> GetPaginatedRoutes([FromQuery] RouteParams routeParams)
        {
            var routes = _context.Route
                .Include(r => r.FromOffice)
                .Include(r => r.ToOffice)
                .OrderByDescending(r => r.CreateDate)
                .Select(r => new RouteDto
                {
                    Id = r.Id,
                    FromOfficeID = r.FromOfficeID,
                    ToOfficeID = r.ToOfficeID,
                    CreateDate = r.CreateDate,
                    Status = r.Status,
                    FromOffice = new OfficeDto
                    {
                        Id = r.FromOfficeID,
                        Address = r.FromOffice.Address,
                        Name = r.FromOffice.Name,
                        TownName = r.FromOffice.Town.Name
                    },
                    ToOffice = new OfficeDto
                    {
                        Id = r.ToOfficeID,
                        Address = r.ToOffice.Address,
                        Name = r.ToOffice.Name,
                        TownName = r.ToOffice.Town.Name
                    }
                });
            var result = await PagedList<RouteDto>.ToPagedList(routes, routeParams.PageNumber, routeParams.PageSize);
            Response.AddPaginationHeader(result.MetaData);
            return Ok(result);
        }

        // GET: api/routes/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<RouteDto>> GetRoute(Guid id)
        {
            var route = await _context.Route
                .Include(r => r.FromOffice)
                    .ThenInclude(o => o.Town)
                .Include(r => r.ToOffice)
                    .ThenInclude(o => o.Town)
                .Include(o => o.OfficesInRoute)
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
                OfficesInRoute = route.OfficesInRoute.Select(oir => new OfficeInRouteDto
                {
                    OfficeId = oir.OfficeID.ToString(),
                    ArrivalTime = oir.ArrivalTime,
                    Order = oir.Order
                }).ToList(),
                FromOffice = new OfficeDto
                {
                    Id = route.FromOfficeID,
                    Address = route.FromOffice.Address,
                    Name = route.FromOffice.Name,
                    TownName = route.FromOffice.Town.Name
                },
                ToOffice = new OfficeDto
                {
                    Id = route.ToOfficeID,
                    Address = route.ToOffice.Address,
                    Name = route.ToOffice.Name,
                    TownName = route.ToOffice.Town.Name
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
                OfficesInRoute = routeCreateDto.OfficesInRoute.Select(oir => new Models.TimeToOffice
                {
                    OfficeID = oir.OfficeId,
                    ArrivalTime = oir.ArrivalTime,
                    Order = oir.Order
                }).ToList()
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
        public async Task<IActionResult> UpdateRoute(Guid id, [FromBody] RouteCreateDto routeCreateDto)
        {
            var route = await _context.Route.Include(r=>r.OfficesInRoute).FirstOrDefaultAsync(r => r.Id == id);

            if (route == null)
            {
                return NotFound();
            }
            _logger.LogInformation("update route" + routeCreateDto.FromOfficeID);
            _logger.LogInformation("length--" + routeCreateDto.OfficesInRoute.Count);

            // Update properties of the existing route entity with DTO values
            route.FromOfficeID = routeCreateDto.FromOfficeID;
            route.ToOfficeID = routeCreateDto.ToOfficeID;
            route.Status = routeCreateDto.Status;

            //update offices in route
           
            _context.RemoveRange(route.OfficesInRoute);

            foreach (var item in routeCreateDto.OfficesInRoute)
            {
                route.OfficesInRoute.Add(new Models.TimeToOffice
                {
                    OfficeID = item.OfficeId,
                    Order = item.Order,
                    ArrivalTime = item.ArrivalTime,
                    RouteID = route.Id,                     
                });
            }
            _context.Update(route);  
            
            var result = await _context.SaveChangesAsync();
            if (result > 0)
                return NoContent();
            return BadRequest(routeCreateDto);
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
