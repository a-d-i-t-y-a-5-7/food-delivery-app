namespace backend.DTOs
{
    public class AddAddressDto
    {
        public int Id { get; set; }

        public int EntityId { get; set; }

        public string? EntityType { get; set; }

        public string AddressLine1 { get; set; } = null!;

        public string? AddressLine2 { get; set; }

        public string City { get; set; } = null!;

        public string State { get; set; } = null!;

        public string ZipCode { get; set; } = null!;

        public string Country { get; set; } = null!;
    }
}
