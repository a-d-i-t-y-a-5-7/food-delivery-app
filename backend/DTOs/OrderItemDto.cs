namespace backend.DTOs
{
    public class OrderItemDto
    {
        public int Id { get; set; }
        public int FoodItemId { get; set; }
        public string? FoodItemName { get; set; }  
        public string? FoodItemImageUrl { get; set; }
        public string? Description { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
