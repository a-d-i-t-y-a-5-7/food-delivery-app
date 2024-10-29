using backend.DTOs;

namespace backend.Services.Interfaces
{
    public interface IOrderService
    {
        bool UpdateOrderStatus(UpdateOrderStatusDto updateOrderStatusDto);
    }
}
