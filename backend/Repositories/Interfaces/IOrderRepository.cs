using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IOrderRepository
    {
        Order? GetOrderById(int orderId);
        void Save();
    }
}
