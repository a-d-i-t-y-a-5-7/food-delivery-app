using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Review
{
    public int Id { get; set; }

    public int? OrderId { get; set; }

    public int? Rating { get; set; }

    public string? Comment { get; set; }

    public string? ReviewType { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Order? Order { get; set; }
}
