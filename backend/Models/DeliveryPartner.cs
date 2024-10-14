using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class DeliveryPartner
{
    public int Id { get; set; }

    public int? PartnerId { get; set; }

    public int? ComplaintCount { get; set; }

    public int? Penalty { get; set; }

    public bool? IsActive { get; set; }

    public string? DeliveryPhoneNumber { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<DeliveryRequest>? DeliveryRequests { get; set; } = new List<DeliveryRequest>();

    public virtual ICollection<Order>? Orders { get; set; } = new List<Order>();

    public virtual User? Partner { get; set; }
}
