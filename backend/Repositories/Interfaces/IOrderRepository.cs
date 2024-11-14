using backend.DTOs;
using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IOrderRepository
    {
        void AddOrder(Order order);
        Task SaveAsync();
        Order GetOrderByOrderId(int orderId);
        public List<OrdersDto> GetOrderByUserId(int userId);
        
    }
}
