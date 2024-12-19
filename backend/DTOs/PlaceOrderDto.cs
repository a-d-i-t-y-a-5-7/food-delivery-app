namespace backend.DTOs
{
    public class PlaceOrderDto
    {
        public int OrderId { get; set; }
        public int CustomerId { get; set; }
        public int RestaurantId { get; set; }
        public int AddressId { get; set; } 
        public List<OrderItemDto> OrderItems { get; set; }
    }
}
