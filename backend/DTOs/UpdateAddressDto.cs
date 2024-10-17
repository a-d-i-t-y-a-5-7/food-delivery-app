using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class UpdateAddressDto
    {
        [Required]
        public string AddressLine1 { get; set; } = null!;

        public string? AddressLine2 { get; set; }

        [Required]
        public string City { get; set; } = null!;

        [Required]
        public string State { get; set; } = null!;

        [Required]
        public string ZipCode { get; set; } = null!;

        [Required]
        public string Country { get; set; } = null!;

        public bool? IsPrimary { get; set; }
    }
}
