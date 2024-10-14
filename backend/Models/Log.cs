using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Log
{
    public int Id { get; set; }

    public int? EntityId { get; set; }

    public string? EntityType { get; set; }

    public string? ActionCategory { get; set; }

    public string? ActionType { get; set; }

    public int? ReferenceId { get; set; }

    public string? ActionDescription { get; set; }

    public DateTime? CreatedAt { get; set; }
}
