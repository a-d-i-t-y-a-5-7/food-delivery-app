using backend.DTOs;

namespace backend.Services.Interfaces
{
    public interface IOrderService
    {
        bool UpdateOrderStatus(UpdateOrderStatusDto updateOrderStatusDto);
        Task<bool> PlaceOrderAsync(PlaceOrderDto placeOrderDto);
        OrdersDto GetOrderByOrderId(int orderId);
        public List<OrdersDto> GetOrderByUserId(int userId);
    }
}
