using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Coupon
{
    public int Id { get; set; }

    public string? Code { get; set; }

    public decimal DiscountPercentage { get; set; }

    public int? RestaurantId { get; set; }

    public DateTime? Expiry { get; set; }

    public bool? IsActive { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Restaurant? Restaurant { get; set; }
}
