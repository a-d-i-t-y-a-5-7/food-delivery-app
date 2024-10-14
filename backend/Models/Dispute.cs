using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Dispute
{
    public int Id { get; set; }

    public int? OrderId { get; set; }

    public string? Reason { get; set; }

    public string? Status { get; set; }

    public string? TookCharge { get; set; }

    public string? Resolution { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Order? Order { get; set; }
}
