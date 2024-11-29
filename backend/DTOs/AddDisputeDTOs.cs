namespace backend.DTOs
{
    public class AddDisputeDTOs
    {
        public int Id { get; set; }

        public int? OrderId { get; set; }

        public string? Reason { get; set; }

        public string? Status { get; set; }

        public string? TookCharge { get; set; }

        public string? Resolution { get; set; }

        public DateTime? CreatedAt { get; set; }
    }
}
