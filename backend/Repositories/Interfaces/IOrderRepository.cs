using backend.DTOs;
using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IOrderRepository
    {
        void AddDeliveryRequest(DeliveryRequest deliveryRequest);
        Task SaveAsync();
        Task<bool> PlaceOrderAsync(PlaceOrderDto placeOrderDto);
        Task<List<Order>> GetAllOrders();
        OrdersDto GetOrderByOrderId(int orderId);
        public List<OrdersDto> GetOrderByUserId(int userId);
        public bool UpdateOrderAcceptance(UpdateOrderStatusDto statusDto);
        public Task<bool> AssignDeliveryPartnerToOrderAsync(int orderId, int deliveryPartnerId);
        Task<bool> UpdatePickUpTimeToOrder(int orderId, DateTime? pickedAt);
        Task<bool> UpdateDeliveryTimeToOrder(int orderId, DateTime? deliveredAt);
        Task<bool> UpdatePaymentStatus(int orderId, string? paymentStatus);


    }
}
