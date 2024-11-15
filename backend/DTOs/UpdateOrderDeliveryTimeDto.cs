namespace backend.DTOs
{
    public class UpdateOrderDeliveryTimeDto
    {
        public int OrderId { get; set; }
        public DateTime? DeliveredAt { get; set; }
    }
}
