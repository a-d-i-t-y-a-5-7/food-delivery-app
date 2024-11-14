using backend.DTOs;
using backend.Models;
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
            var order = _orderRepository.GetOrderByOrderId(updateOrderStatusDto.OrderId);

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
        }
        public OrdersDto PlaceOrder(PlaceOrderDto placeOrderDto)
        {
            if (placeOrderDto == null)
                return null;

            var order = new Order
            {
                CustomerId = placeOrderDto.CustomerId,
                RestaurantId = placeOrderDto.RestaurantId,
                TotalAmount = placeOrderDto.TotalAmount,
                Status = "Pending", 
                CreatedAt = DateTime.Now
            };

            _orderRepository.Add(order);
            _orderRepository.Save();


            return new OrdersDto
            {
                OrderId = order.Id,
                TotalAmount = order.TotalAmount,
                Status = order.Status,
                PaymentStatus = order.PaymentStatus
            };
        }

        public OrdersDto GetOrderByOrderId(int orderId)
        {
            var order = _orderRepository.GetOrderByOrderId(orderId);
            if (order == null)
                return null;

            return new OrdersDto
            {
                OrderId = order.Id,
                CustomerName = order.Customer?.Name,
                Restaurantname = order.Restaurant?.Name,
                TotalAmount = order.TotalAmount,
                Status = order.Status,
                PaymentStatus = order.PaymentStatus
            };
        }
        public List<OrdersDto> GetOrderByUserId(int userId)
        {
            List<OrdersDto> orders = _orderRepository.GetOrderByUserId(userId);
            return orders;
        }

    }  
}
