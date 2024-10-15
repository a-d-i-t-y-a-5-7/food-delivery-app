﻿using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class User
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public string? PhoneNumber { get; set; }

    public DateTime? CreatedAt { get; set; }

    public string? Role { get; set; }

    public virtual ICollection<Admin> Admins { get; set; } = new List<Admin>();

    public virtual ICollection<DeliveryPartner> DeliveryPartners { get; set; } = new List<DeliveryPartner>();

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<Restaurant> Restaurants { get; set; } = new List<Restaurant>();
}
