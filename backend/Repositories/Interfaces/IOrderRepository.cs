using backend.DTOs;
using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IOrderRepository
    {
        void AddOrder(Order order);
        void AddDeliveryRequest(DeliveryRequest deliveryRequest);
        Task SaveAsync();
        Order GetOrderByOrderId(int orderId);
        public List<OrdersDto> GetOrderByUserId(int userId);
        public bool UpdateOrderAcceptance(UpdateOrderStatusDto statusDto);
        
    }
}
