using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public partial class FoodDeliveryDbContext : DbContext
{
    public FoodDeliveryDbContext()
    {
    }

    public FoodDeliveryDbContext(DbContextOptions<FoodDeliveryDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Address> Addresses { get; set; }

    public virtual DbSet<Admin> Admins { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Coupon> Coupons { get; set; }

    public virtual DbSet<Cuisine> Cuisines { get; set; }

    public virtual DbSet<DeliveryPartner> DeliveryPartners { get; set; }

    public virtual DbSet<DeliveryRequest> DeliveryRequests { get; set; }

    public virtual DbSet<Dispute> Disputes { get; set; }

    public virtual DbSet<FoodItem> FoodItems { get; set; }

    public virtual DbSet<Log> Logs { get; set; }

    public virtual DbSet<Notification> Notifications { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderItem> OrderItems { get; set; }

    public virtual DbSet<Restaurant> Restaurants { get; set; }

    public virtual DbSet<RestaurantCuisine> RestaurantCuisines { get; set; }

    public virtual DbSet<Review> Reviews { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("data source=pratikta-vd3;initial catalog=FoodDeliveryDB;persist security info=True;user id=sa;password=cybage@123456;TrustServerCertificate=True;MultipleActiveResultSets=True;App=EntityFramework;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Address>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Addresse__3213E83FB5F7BBBE");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AddressLine1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("address_line1");
            entity.Property(e => e.AddressLine2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("address_line2");
            entity.Property(e => e.City)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("city");
            entity.Property(e => e.Country)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("country");
            entity.Property(e => e.EntityId).HasColumnName("entity_id");
            entity.Property(e => e.EntityType)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("entity_type");
            entity.Property(e => e.IsPrimary)
                .HasDefaultValue(false)
                .HasColumnName("is_primary");
            entity.Property(e => e.State)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("state");
            entity.Property(e => e.ZipCode)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("zip_code");
        });

        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Admins__3213E83FC3068478");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AdminUserId).HasColumnName("admin_user_id");
            entity.Property(e => e.Level).HasColumnName("level");

            entity.HasOne(d => d.AdminUser).WithMany(p => p.Admins)
                .HasForeignKey(d => d.AdminUserId)
                .HasConstraintName("FK__Admins__admin_us__3B75D760");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Categori__3213E83F5425CD9C");

            entity.HasIndex(e => e.CategoryName, "UQ__Categori__5189E255F21144DA").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CategoryName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("category_name");
        });

        modelBuilder.Entity<Coupon>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Coupons__3213E83FECFCB67B");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Code)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("code");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.DiscountPercentage)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("discount_percentage");
            entity.Property(e => e.Expiry)
                .HasColumnType("datetime")
                .HasColumnName("expiry");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.RestaurantId).HasColumnName("restaurant_id");

            entity.HasOne(d => d.Restaurant).WithMany(p => p.Coupons)
                .HasForeignKey(d => d.RestaurantId)
                .HasConstraintName("FK__Coupons__restaur__70DDC3D8");
        });

        modelBuilder.Entity<Cuisine>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Cuisines__3213E83F12689BB9");

            entity.HasIndex(e => e.CuisineName, "UQ__Cuisines__A15646FB64C0D1AE").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CuisineName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("cuisine_name");
        });

        modelBuilder.Entity<DeliveryPartner>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Delivery__3213E83FA37A85B1");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ComplaintCount).HasColumnName("complaint_count");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.DeliveryPhoneNumber)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("delivery_phone_number");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.PartnerId).HasColumnName("partner_id");
            entity.Property(e => e.Penalty).HasColumnName("penalty");

            entity.HasOne(d => d.Partner).WithMany(p => p.DeliveryPartners)
                .HasForeignKey(d => d.PartnerId)
                .HasConstraintName("FK__DeliveryP__partn__5629CD9C");
        });

        modelBuilder.Entity<DeliveryRequest>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Delivery__3213E83FDA833CFD");

            entity.ToTable("DeliveryRequest");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.DeliveryInsentive).HasColumnName("delivery_insentive");
            entity.Property(e => e.DeliveryPartnerId).HasColumnName("delivery_partner_id");
            entity.Property(e => e.OrderId).HasColumnName("order_id");

            entity.HasOne(d => d.DeliveryPartner).WithMany(p => p.DeliveryRequests)
                .HasForeignKey(d => d.DeliveryPartnerId)
                .HasConstraintName("FK__DeliveryR__deliv__6C190EBB");

            entity.HasOne(d => d.Order).WithMany(p => p.DeliveryRequests)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK__DeliveryR__order__6D0D32F4");
        });

        modelBuilder.Entity<Dispute>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Disputes__3213E83F563BF25D");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.Reason)
                .HasColumnType("text")
                .HasColumnName("reason");
            entity.Property(e => e.Resolution)
                .HasColumnType("text")
                .HasColumnName("resolution");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("status");
            entity.Property(e => e.TookCharge)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("took_charge");

            entity.HasOne(d => d.Order).WithMany(p => p.Disputes)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK__Disputes__order___75A278F5");
        });

        modelBuilder.Entity<FoodItem>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__FoodItem__3213E83FFD0E590E");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.CuisineTypeId).HasColumnName("cuisine_type_id");
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasColumnName("description");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("image_url");
            entity.Property(e => e.IsAvailable)
                .HasDefaultValue(true)
                .HasColumnName("is_available");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.Price)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("price");
            entity.Property(e => e.RestaurantId).HasColumnName("restaurant_id");

            entity.HasOne(d => d.Category).WithMany(p => p.FoodItems)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__FoodItems__categ__52593CB8");

            entity.HasOne(d => d.CuisineType).WithMany(p => p.FoodItems)
                .HasForeignKey(d => d.CuisineTypeId)
                .HasConstraintName("FK__FoodItems__cuisi__5165187F");

            entity.HasOne(d => d.Restaurant).WithMany(p => p.FoodItems)
                .HasForeignKey(d => d.RestaurantId)
                .HasConstraintName("FK__FoodItems__resta__5070F446");
        });

        modelBuilder.Entity<Log>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Logs__3213E83F83FDFA0E");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ActionCategory)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("action_category");
            entity.Property(e => e.ActionDescription)
                .HasColumnType("text")
                .HasColumnName("action_description");
            entity.Property(e => e.ActionType)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("action_type");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.EntityId).HasColumnName("entity_id");
            entity.Property(e => e.EntityType)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("entity_type");
            entity.Property(e => e.ReferenceId).HasColumnName("reference_id");
        });

        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Notifica__3213E83FF650B2E2");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AdminId).HasColumnName("admin_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.NotificationText)
                .HasColumnType("text")
                .HasColumnName("notification_text");
            entity.Property(e => e.RedirectionLink)
                .HasColumnType("text")
                .HasColumnName("redirection_link");
            entity.Property(e => e.SentToUserId).HasColumnName("sent_to_user_id");

            entity.HasOne(d => d.Admin).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.AdminId)
                .HasConstraintName("FK__Notificat__admin__7B5B524B");

            entity.HasOne(d => d.SentToUser).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.SentToUserId)
                .HasConstraintName("FK__Notificat__sent___7C4F7684");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Orders__3213E83F4314A343");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Address).HasColumnName("address");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.CustomerId).HasColumnName("customer_id");
            entity.Property(e => e.DeliveredAt)
                .HasColumnType("datetime")
                .HasColumnName("delivered_at");
            entity.Property(e => e.DeliveryPartnerId).HasColumnName("delivery_partner_id");
            entity.Property(e => e.PaymentStatus)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("payment_status");
            entity.Property(e => e.PickedAt)
                .HasColumnType("datetime")
                .HasColumnName("picked_at");
            entity.Property(e => e.RestaurantId).HasColumnName("restaurant_id");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("status");
            entity.Property(e => e.TotalAmount)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("total_amount");

            entity.HasOne(d => d.AddressNavigation).WithMany(p => p.Orders)
                .HasForeignKey(d => d.Address)
                .HasConstraintName("FK__Orders__address__5DCAEF64");

            entity.HasOne(d => d.Customer).WithMany(p => p.Orders)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("FK__Orders__customer__5AEE82B9");

            entity.HasOne(d => d.DeliveryPartner).WithMany(p => p.Orders)
                .HasForeignKey(d => d.DeliveryPartnerId)
                .HasConstraintName("FK__Orders__delivery__5CD6CB2B");

            entity.HasOne(d => d.Restaurant).WithMany(p => p.Orders)
                .HasForeignKey(d => d.RestaurantId)
                .HasConstraintName("FK__Orders__restaura__5BE2A6F2");
        });

        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__OrderIte__3213E83F13ECFFAE");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.FoodItemId).HasColumnName("food_item_id");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.Price)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("price");
            entity.Property(e => e.Quantity).HasColumnName("quantity");

            entity.HasOne(d => d.FoodItem).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.FoodItemId)
                .HasConstraintName("FK__OrderItem__food___6477ECF3");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK__OrderItem__order__6383C8BA");
        });

        modelBuilder.Entity<Restaurant>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Restaura__3213E83F144D4D7E");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ClosingTime)
                .HasColumnType("datetime")
                .HasColumnName("closing_time");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.IsApproved)
                .HasDefaultValue(false)
                .HasColumnName("is_approved");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.OpeningTime)
                .HasColumnType("datetime")
                .HasColumnName("opening_time");
            entity.Property(e => e.OwnerId).HasColumnName("owner_id");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("phone_number");
            entity.Property(e => e.Rating)
                .HasColumnType("decimal(2, 1)")
                .HasColumnName("rating");

            entity.HasOne(d => d.Owner).WithMany(p => p.Restaurants)
                .HasForeignKey(d => d.OwnerId)
                .HasConstraintName("FK__Restauran__owner__412EB0B6");
        });

        modelBuilder.Entity<RestaurantCuisine>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Restaura__3213E83FD8FED35D");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CuisineId).HasColumnName("cuisine_id");
            entity.Property(e => e.RestaurantId).HasColumnName("restaurant_id");

            entity.HasOne(d => d.Cuisine).WithMany(p => p.RestaurantCuisines)
                .HasForeignKey(d => d.CuisineId)
                .HasConstraintName("FK__Restauran__cuisi__4D94879B");

            entity.HasOne(d => d.Restaurant).WithMany(p => p.RestaurantCuisines)
                .HasForeignKey(d => d.RestaurantId)
                .HasConstraintName("FK__Restauran__resta__4CA06362");
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Reviews__3213E83F398A9EE6");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Comment)
                .HasColumnType("text")
                .HasColumnName("comment");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.Rating).HasColumnName("rating");
            entity.Property(e => e.ReviewType)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("review_type");

            entity.HasOne(d => d.Order).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK__Reviews__order_i__6754599E");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Roles__8AFACE1A8549BE30");

            entity.Property(e => e.RoleType)
                .HasMaxLength(40)
                .IsUnicode(false);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3213E83F79811A41");

            entity.HasIndex(e => e.Email, "UQ__Users__AB6E6164175ECCB5").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("password_hash");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("phone_number");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK__Users__RoleId__05D8E0BE");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
