using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class FoodItem
{
    public int Id { get; set; }

    public int? RestaurantId { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public int? CuisineTypeId { get; set; }

    public decimal Price { get; set; }

    public string? ImageUrl { get; set; }

    public int? CategoryId { get; set; }

    public bool? IsAvailable { get; set; }

    public int? Quantity { get; set; }

    public virtual Category? Category { get; set; }

    public virtual Cuisine? CuisineType { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual Restaurant? Restaurant { get; set; }
}
