using backend.DTOs;

namespace backend.Services.Interfaces
{
    public interface IOrderService
    {
        bool UpdateOrderStatus(UpdateOrderStatusDto updateOrderStatusDto);
        OrdersDto PlaceOrder(PlaceOrderDto placeOrderDto);
        OrdersDto GetOrderByOrderId(int orderId);
        public List<OrdersDto> GetOrderByUserId(int userId);
    }
}
