namespace backend.DTOs
{
    public class UpdatePaymentStatusDto
    {
        public int OrderId { get; set; }
        public string? PaymentStatus { get; set; }
    }
}
