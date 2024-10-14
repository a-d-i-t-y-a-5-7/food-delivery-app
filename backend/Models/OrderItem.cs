using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class OrderItem
{
    public int Id { get; set; }

    public int? OrderId { get; set; }

    public int? FoodItemId { get; set; }

    public int Quantity { get; set; }

    public decimal Price { get; set; }

    public virtual FoodItem? FoodItem { get; set; }

    public virtual Order? Order { get; set; }
}
