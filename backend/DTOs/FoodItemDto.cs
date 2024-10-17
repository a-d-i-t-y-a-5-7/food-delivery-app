﻿namespace backend.DTOs
{
    public class FoodItemDto
    {
        public int RestaurantId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int CuisineTypeId { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public int CategoryId { get; set; }
        public bool IsAvailable { get; set; }
    }
}
