using coach_ticket_booking_api.Data;
using coach_ticket_booking_api.DTOs.Address;
using coach_ticket_booking_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace coach_ticket_booking_api.Controllers
{
    public class AddressesController : BaseApiController
    {
        private readonly AppDbContext _context;

        public AddressesController(AppDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("user-address")]
        public async Task<ActionResult<List<Address>>> GetAddressesAsync()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var addresses = await _context.Addresses
                .Where(a => a.UserID == Guid.Parse(userId))
                .Select(a=>new AddressDto
                {
                    Id=a.Id,
                    Content=a.Content,
                    IsPrimary=a.IsPrimary,
                    Name=a.Name                    
                })
                .ToListAsync();


            return Ok(addresses);
        }

        [Authorize]
        [HttpPost("add-user-address")]
        public async Task<ActionResult<List<Address>>> AddAddressesAsync(AddAddressRequestDto addressDto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (ModelState.IsValid)
            {
                var address = new Address
                {
                    UserID = Guid.Parse(userId),
                    Content = addressDto.Content,
                    Name = addressDto.Name,
                    IsPrimary = addressDto.IsPrimary
                };

                var addresses = await _context.Addresses.Where(a => a.UserID == Guid.Parse(userId)).ToListAsync();

                if (!addresses.Any())
                {
                    address.IsPrimary = true;
                }
                else
                {
                    if (address.IsPrimary)
                    {
                        addresses.ForEach(a => { a.IsPrimary = false; });
                    }
                }

                _context.Add(address);

                var result = _context.SaveChanges() > 0;

                if (result) { return NoContent(); }
            }


            return BadRequest(new ProblemDetails { Title = "Thêm địa chỉ thất bại" });
        }

        [Authorize]
        [HttpPost("update-user-address")]
        public async Task<ActionResult<List<Address>>> UpdateAddressAsync(AddressDto addressDto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (ModelState.IsValid)
            {             
                var address = await _context.Addresses.FindAsync(addressDto.Id);

                if (address == null) return BadRequest();
                
                address.IsPrimary = addressDto.IsPrimary;
                address.Name = addressDto.Name;
                address.Content= addressDto.Content;
                
                _context.Entry(address).State= EntityState.Modified;

                var result = _context.SaveChanges() > 0;

                if (result) { return NoContent(); }
            }
            return BadRequest(new ProblemDetails { Title = "Cập nhật địa chỉ thất bại" });
        }

        [Authorize]
        [HttpDelete("delete-address/{addressId}")]
        public async Task<IActionResult> DeleteAddress(Guid addressId)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            // Retrieve the address to delete (ensure it belongs to the authenticated user).
            var address = await _context.Addresses.FirstOrDefaultAsync(a => a.Id == addressId && a.UserID == Guid.Parse(userId));

            if (address == null)
            {
                return NotFound("Address not found or does not belong to the user.");
            }

            _context.Addresses.Remove(address);

            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return NoContent(); // Address deleted successfully.
            }

            return BadRequest("Failed to delete the address.");
        }
    }
}
