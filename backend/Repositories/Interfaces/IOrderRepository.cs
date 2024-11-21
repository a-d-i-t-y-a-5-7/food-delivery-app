using backend.DTOs;
using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IOrderRepository
    {
        Task<bool> PlaceOrderAsync(PlaceOrderDto placeOrderDto);
        void AddDeliveryRequest(DeliveryRequest deliveryRequest);
        Task SaveAsync();
        Order GetOrderByOrderId(int orderId);
        public List<OrdersDto> GetOrderByUserId(int userId);
        
    }
}
