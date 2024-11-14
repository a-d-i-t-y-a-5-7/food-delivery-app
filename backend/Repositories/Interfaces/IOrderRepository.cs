using backend.DTOs;
using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IOrderRepository
    {
       
        void Save();
        void Add(Order order);
        Order GetOrderByOrderId(int orderId);
        public List<OrdersDto> GetOrderByUserId(int userId);
    }
}
