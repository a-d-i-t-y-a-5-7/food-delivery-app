using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Notification
{
    public int Id { get; set; }

    public int? AdminId { get; set; }

    public int? SentToUserId { get; set; }

    public string? NotificationText { get; set; }

    public string? RedirectionLink { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Admin? Admin { get; set; }

    public virtual User? SentToUser { get; set; }
}
