using coach_ticket_booking_api.Data;
using coach_ticket_booking_api.DTOs.Town;
using coach_ticket_booking_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace coach_ticket_booking_api.Controllers
{
    public class TownController : BaseApiController
    {
        private readonly AppDbContext _context;

        public TownController(AppDbContext context)
        {
            _context = context;
        }

        //[Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<List<Town>>> GetTowns()
        {
            var towns = await _context.Towns.ToListAsync();
            return Ok(towns);
        }


        [Authorize(Roles = "Admin")]
        [HttpPost("create-towns")] 
        public IActionResult CreateTowns([FromBody] List<TownDto> towns)
        {
            if (towns == null || towns.Count == 0)
            {
                return BadRequest("No towns provided.");
            }

            // Perform validation and other logic as needed.

            foreach (var town in towns)
            {
                // Optionally, perform validation for each town object.
                if (string.IsNullOrWhiteSpace(town.Name))
                {
                    ModelState.AddModelError(nameof(town.Name), "Town name is required.");
                }
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Save the list of towns to the database.
            _context.Towns.AddRange(towns.Select(t => new Town { Name = t.Name }));
            var result = _context.SaveChanges() > 0;

            if (result)
            {
                return NoContent(); // Towns created successfully.
            }

            return BadRequest("Failed to create towns.");
        }
    }
}
