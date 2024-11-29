namespace backend.DTOs
{
    public class CouponDto
    {
        
        public decimal DiscountPercentage { get; set; }
        public int RestaurantId { get; set; }
        public DateTime? Expiry { get; set; }
        public bool? IsActive { get; set; }
    }
}
