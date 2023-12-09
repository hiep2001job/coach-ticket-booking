using coach_ticket_booking_api.Data;
using coach_ticket_booking_api.DTOs.Coach;
using coach_ticket_booking_api.Enums;
using coach_ticket_booking_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace coach_ticket_booking_api.Controllers
{
    public class CoachController:BaseApiController
    {
        private readonly AppDbContext _context;

        public CoachController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/coaches
        [HttpGet]
        public ActionResult<IEnumerable<CoachDto>> GetCoaches([FromQuery] string? search)
        {
            var coaches = _context.Coaches.Select(c => new CoachDto
            {
                Id = c.Id,
                CoachCode = c.CoachCode,
                CoachNumber = c.CoachNumber,
                Status = c.Status,
                CreateDate = c.CreateDate
            }).AsQueryable();
            if (!string.IsNullOrEmpty(search)) coaches = coaches.Where(x => x.CoachCode.Contains(search!));
            var result=coaches.ToList();
            return Ok(coaches);
        }

        // GET: api/coaches/{id}
        [HttpGet("{id}")]
        public ActionResult<CoachDto> GetCoach(Guid id)
        {
            var coach = _context.Coaches
                .Where(c => c.Id == id)
                .Select(c => new CoachDto
                {
                    Id = c.Id,
                    CoachCode = c.CoachCode,
                    CoachNumber = c.CoachNumber,
                    Status = c.Status,
                    CreateDate = c.CreateDate
                })
                .FirstOrDefault();
            if (coach == null)
            {
                return NotFound();
            }

            return Ok(coach);
        }

        // POST: api/coaches
        [HttpPost]
        public ActionResult<CoachDto> CreateCoach(CoachCreateDto CoachDto)
        {
            var coach = new Coach
            {
                CoachCode = CoachDto.CoachCode,
                CoachNumber = CoachDto.CoachNumber,
                Status = CoachStatus.Available // You can set the default status here
            };

            _context.Coaches.Add(coach);
            _context.SaveChanges();

            var createdCoachDto = new CoachDto
            {
                Id = coach.Id,
                CoachCode = coach.CoachCode,
                CoachNumber = coach.CoachNumber,
                Status = coach.Status,
                CreateDate = coach.CreateDate
            };

            return CreatedAtAction(nameof(GetCoach), new { id = coach.Id }, createdCoachDto);
        }

        // PUT: api/coaches/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateCoach(Guid id, CoachCreateDto CoachDto)
        {
            var coach = _context.Coaches.FirstOrDefault(c => c.Id == id);

            if (coach == null)
            {
                return NotFound();
            }

            coach.CoachCode = CoachDto.CoachCode;
            coach.CoachNumber = CoachDto.CoachNumber;

            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/coaches/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteCoach(Guid id)
        {
            var coach = _context.Coaches.FirstOrDefault(c => c.Id == id);

            if (coach == null)
            {
                return NotFound();
            }

            _context.Coaches.Remove(coach);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
