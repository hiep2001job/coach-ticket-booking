using coach_ticket_booking_api.Data;
using coach_ticket_booking_api.DTOs.Contact;
using coach_ticket_booking_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace coach_ticket_booking_api.Controllers
{
    [Authorize]
    public class ContactController : BaseApiController
    {
        private readonly AppDbContext _context;

        public ContactController(AppDbContext context)
        {
            _context = context;
        }
        [HttpPost("create")]
        public async Task<ActionResult> CreateContact([FromBody] CreateContactDto contactDto)
        {
            if (!ModelState.IsValid) return BadRequest();

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var Contact = new Contact
            {
                Content = contactDto.Content,
                SenderID = Guid.Parse(userId),
                Subject = contactDto.Subject,
                SenderEmail = contactDto.SenderEmail,
                SenderPhone = contactDto.SenderPhone,
                Status = Enums.ContactStatus.Sent

            };
            _context.Contacts.Add(Contact);
            _context.SaveChanges();
            return Ok("Contact created successfully.");
        }

        [HttpGet("list")]
        public async Task<ActionResult> ListContacts()
        {
            // In a real application, you would fetch the contacts from a database.
            // For this example, we're using an in-memory list.
            var contacts = await _context.Contacts.ToListAsync();

            return Ok(contacts);
        }
    }
}
