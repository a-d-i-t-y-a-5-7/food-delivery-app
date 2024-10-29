namespace backend.DTOs
{
    public class DeliveryPartnerOrderDetailsDto
    {
        public int DeliveryPartnerId { get; set; }
        public List<OrderDetail> Orders { get; set; }

        public class OrderDetail
        {
            public int OrderId { get; set; }
            public decimal TotalAmount { get; set; }
            public string Status { get; set; }
            public DateTime CreatedAt { get; set; }
            public DateTime? PickedAt { get; set; }
            public DateTime? DeliveredAt { get; set; }
            public string RestaurantName { get; set; }
            public string RestaurantNumber { get; set; }
            public string CustomerName { get; set; }
            public string CustomerNumber { get; set; }
            public int? DeliveryIncentive { get; set; }
        }
    }

}
