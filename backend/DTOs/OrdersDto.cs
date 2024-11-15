using backend.Models;

namespace backend.DTOs
{
    public class OrdersDto
    {
        public int OrderId { get; set; }
        public string? CustomerName { get; set; }
        public string? Restaurantname { get; set; }
        public decimal TotalAmount { get; set; }
        public string? Status { get; set; }
        public string? PaymentStatus { get; set; }
        public DateTime? PickedAt { get; set; }
        public DateTime? DeliveredAt { get; set; }
        public int? DeliveryPartnerId { get; set; }
        public List<OrderItemDto> OrderItems { get; set; } = new List<OrderItemDto>();


    }
}
