using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Restaurant
{
    public int Id { get; set; }

    public int? OwnerId { get; set; }

    public string Name { get; set; } = null!;

    public string? PhoneNumber { get; set; }

    public decimal? Rating { get; set; }

    public DateTime? OpeningTime { get; set; }

    public DateTime? ClosingTime { get; set; }

    public bool? IsApproved { get; set; }

    public bool? IsActive { get; set; }

    public DateTime? CreatedAt { get; set; }

    public string? ImageUrl { get; set; }

    public virtual ICollection<Coupon> Coupons { get; set; } = new List<Coupon>();

    public virtual ICollection<FoodItem> FoodItems { get; set; } = new List<FoodItem>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual User? Owner { get; set; }

    public virtual ICollection<RestaurantCuisine> RestaurantCuisines { get; set; } = new List<RestaurantCuisine>();
}
