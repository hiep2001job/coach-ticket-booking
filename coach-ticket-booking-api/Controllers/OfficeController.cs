using coach_ticket_booking_api.Data;
using coach_ticket_booking_api.DTOs.Office;
using coach_ticket_booking_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace coach_ticket_booking_api.Controllers
{
    public class OfficeController:BaseApiController
    {
        private readonly AppDbContext _context;

        public OfficeController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/offices
        [HttpGet]
        public ActionResult<IEnumerable<OfficeDto>> GetOffices()
        {
            var offices = _context.Offices.Select(o => new OfficeDto
            {
                Id = o.Id,
                Name = o.Name,
                Address = o.Address,
                TownId = o.TownId,
                CreateDate = o.CreateDate
            }).ToList();

            return Ok(offices);
        }

        // GET: api/offices/{id}
        [HttpGet("{id}")]
        public ActionResult<OfficeDto> GetOffice(Guid id)
        {
            var office = _context.Offices
                .Where(o => o.Id == id)
                .Select(o => new OfficeDto
                {
                    Id = o.Id,
                    Name = o.Name,
                    Address = o.Address,
                    TownId = o.TownId,                   
                    CreateDate = o.CreateDate
                })
                .FirstOrDefault();

            if (office == null)
            {
                return NotFound();
            }

            return Ok(office);
        }

        // POST: api/offices
        [HttpPost]
        public ActionResult<OfficeDto> CreateOffice(OfficeCreateDto officeDto)
        {
            // Map DTO to Office entity and save to the database
            var office = new Office
            {
                Name = officeDto.Name,
                Address = officeDto.Address,
                TownId = officeDto.TownId,
                // Map other properties as needed
            };

            _context.Offices.Add(office);
            _context.SaveChanges();

            // Map the created office back to DTO
            var createdOfficeDto = new OfficeDto
            {
                Id = office.Id,
                Name = office.Name,
                Address = office.Address,
                TownId = office.TownId,
               
                CreateDate = office.CreateDate
            };

            return CreatedAtAction(nameof(GetOffice), new { id = office.Id }, createdOfficeDto);
        }

        // PUT: api/offices/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateOffice(Guid id, OfficeDto OfficeDto)
        {
            var office = _context.Offices.FirstOrDefault(o => o.Id == id);

            if (office == null)
            {
                return NotFound();
            }

            // Update properties of the existing office entity with DTO values
            office.Name = OfficeDto.Name;
            office.Address = OfficeDto.Address;
            office.TownId = OfficeDto.TownId;
            // Update other properties as needed

            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/offices/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteOffice(Guid id)
        {
            var office = _context.Offices.FirstOrDefault(o => o.Id == id);

            if (office == null)
            {
                return NotFound();
            }

            _context.Offices.Remove(office);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
