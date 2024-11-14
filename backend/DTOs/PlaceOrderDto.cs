namespace backend.DTOs
{
    public class PlaceOrderDto
    {
        public int CustomerId { get; set; }
        public int RestaurantId { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
