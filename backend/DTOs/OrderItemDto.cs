namespace backend.DTOs
{
    public class OrderItemDto
    {
        public int Id { get; set; }
        public int FoodItemId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
