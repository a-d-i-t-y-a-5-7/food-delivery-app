using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class DeliveryRequest
{
    public int Id { get; set; }

    public int? DeliveryPartnerId { get; set; }

    public int? OrderId { get; set; }

    public int? DeliveryInsentive { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual DeliveryPartner? DeliveryPartner { get; set; }

    public virtual Order? Order { get; set; }
}
