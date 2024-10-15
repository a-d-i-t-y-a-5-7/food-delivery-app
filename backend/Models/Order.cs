using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Order
{
    public int Id { get; set; }

    public int? CustomerId { get; set; }

    public int? RestaurantId { get; set; }

    public int? DeliveryPartnerId { get; set; }

    public decimal TotalAmount { get; set; }

    public int? Address { get; set; }

    public string? Status { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? PickedAt { get; set; }

    public DateTime? DeliveredAt { get; set; }

    public string? PaymentStatus { get; set; }

    public virtual Address? AddressNavigation { get; set; }

    public virtual User? Customer { get; set; }

    public virtual DeliveryPartner? DeliveryPartner { get; set; }

    public virtual ICollection<DeliveryRequest> DeliveryRequests { get; set; } = new List<DeliveryRequest>();

    public virtual ICollection<Dispute> Disputes { get; set; } = new List<Dispute>();

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual Restaurant? Restaurant { get; set; }

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
}
