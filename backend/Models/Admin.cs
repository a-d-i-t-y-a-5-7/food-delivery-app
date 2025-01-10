using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Admin
{
    public int Id { get; set; }

    public int? AdminUserId { get; set; }

    public int Level { get; set; }

    public virtual User? AdminUser { get; set; }

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();
}

