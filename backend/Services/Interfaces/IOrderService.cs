using backend.DTOs;

namespace backend.Services.Interfaces
{
    public interface IOrderService
    {
        Task<bool> PlaceOrderAsync(PlaceOrderDto placeOrderDto);
        OrdersDto GetOrderByOrderId(int orderId);
        public List<OrdersDto> GetOrderByUserId(int userId);
        bool AssignDeliveryPartnerToOrder(int orderId, int deliveryPartnerId);
        bool UpdatePickUpTimeToOrder(int orderId, DateTime? PickedAt);
        bool UpdateDeliveryTimeToOrder(int orderId, DateTime? DeliveredAt);
        bool UpdatePaymentStatus(int orderId, string? PaymentStatus);
        bool UpdateOrderStatus(UpdateOrderStatusDto updateOrderStatusDto);
        public bool UpdateOrderAcceptance(UpdateOrderStatusDto statusDto);
    }
}
