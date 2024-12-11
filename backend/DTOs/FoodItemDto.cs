namespace backend.DTOs
{
    public class FoodItemDto
    {
        public string Name { get; set; } 
        public string Description { get; set; }
        public string? ImageUrl { get; set; }
        public int CuisineTypeId { get; set; }
        public decimal Price { get; set; }
        public int CategoryId { get; set; }
        public bool IsAvailable { get; set; }
        public bool quantity {  get; set; }
    }
}
