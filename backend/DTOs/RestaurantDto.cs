namespace backend.DTOs
{
    public class RestaurantDto
    {
            public int Id { get; set; }
            public int? OwnerId { get; set; }
            public required string Name { get; set; }
            public required string PhoneNumber { get; set; }
            public decimal? Rating { get; set; }
            public DateTime? OpeningTime { get; set; }
            public DateTime? ClosingTime { get; set; }
            public bool? IsApproved { get; set; }
            public bool? IsActive { get; set; }
            public DateTime? CreatedAt { get; set; }
            public string image_url { get; set; }
            public List<string> Cuisine { get; set; }
    }
}
