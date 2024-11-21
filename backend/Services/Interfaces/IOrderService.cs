using backend.DTOs;

namespace backend.Services.Interfaces
{
    public interface IOrderService
    {
        Task<bool> PlaceOrderAsync(PlaceOrderDto placeOrderDto);
        OrdersDto GetOrderByOrderId(int orderId);
        public List<OrdersDto> GetOrderByUserId(int userId);
        Task<bool> AssignDeliveryPartnerToOrderAsync(int orderId, int deliveryPartnerId);
        Task<bool> UpdatePickUpTimeToOrder(int orderId, DateTime? pickedAt);
        Task<bool> UpdateDeliveryTimeToOrder(int orderId, DateTime? deliveredAt);
        Task<bool> UpdatePaymentStatus(int orderId, string? paymentStatus);
        bool UpdateOrderStatus(UpdateOrderStatusDto updateOrderStatusDto);
    }
}
