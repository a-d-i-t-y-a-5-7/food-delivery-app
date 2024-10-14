using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Cuisine
{
    public int Id { get; set; }

    public string? CuisineName { get; set; }

    public virtual ICollection<FoodItem> FoodItems { get; set; } = new List<FoodItem>();

    public virtual ICollection<RestaurantCuisine> RestaurantCuisines { get; set; } = new List<RestaurantCuisine>();
}
