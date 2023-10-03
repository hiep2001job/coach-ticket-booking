using System.ComponentModel.DataAnnotations;

namespace coach_ticket_booking_api.DTOs.Auth
{
    public class ChangePasswordDto
    {
       

        [Required]
        [DataType(DataType.Password)]
        public string CurrentPassword { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; }

        [Required]
        [Compare("NewPassword")]
        [DataType(DataType.Password)]
        public string ConfirmNewPassword { get; set; }
    }
}
