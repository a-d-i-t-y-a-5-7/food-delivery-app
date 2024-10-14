using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Address
{
    public int Id { get; set; }

    public int? EntityId { get; set; }

    public string? EntityType { get; set; }

    public string AddressLine1 { get; set; } = null!;

    public string? AddressLine2 { get; set; }

    public string City { get; set; } = null!;

    public string State { get; set; } = null!;

    public string ZipCode { get; set; } = null!;

    public string Country { get; set; } = null!;

    public bool? IsPrimary { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
