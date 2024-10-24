using backend.DTOs;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services.Implementations
{
        public class OrderService : IOrderService
        {
            private readonly IOrderRepository _orderRepository;

            public OrderService(IOrderRepository orderRepository)
            {
                _orderRepository = orderRepository;
            }

        public bool UpdateOrderStatus(UpdateOrderStatusDto updateOrderStatusDto)
        {
            var order = _orderRepository.GetOrderById(updateOrderStatusDto.OrderId);

            if (order == null)
                return false;

            if (updateOrderStatusDto.Status == "OutForDelivery")
            {
                order.Status = "OutForDelivery";
                order.PickedAt = DateTime.Now;
            }
            else if (updateOrderStatusDto.Status == "Delivered")
            {
                order.Status = "Delivered";
                order.DeliveredAt = DateTime.Now;
            }
            else
            {
                return false;
            }

            _orderRepository.Save();
            return true;
        }   }  
}
