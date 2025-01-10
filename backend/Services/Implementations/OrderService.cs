using backend.DTOs;
using backend.Models;
using backend.Repositories.Implementations;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;


namespace backend.Services.Implementations
{
        public class OrderService : IOrderService
        {
            private readonly IOrderRepository _orderRepository;
            private readonly IFoodItemRepository _foodItemRepository;

        public OrderService(IOrderRepository orderRepository,  IFoodItemRepository foodItemRepository)
            {
                _orderRepository = orderRepository;
                _foodItemRepository = foodItemRepository;              
            }
        public async Task<bool> PlaceOrderAsync(PlaceOrderDto placeOrderDto)
        {
            try
            {
                return await _orderRepository.PlaceOrderAsync(placeOrderDto);
            }
            catch (Exception ex)
            {
               
                throw new Exception($"Error placing order: {ex.Message}");
            }
        }
        public OrdersDto GetOrderByOrderId(int orderId)
        {
            return _orderRepository.GetOrderByOrderId(orderId);
        }


        public async Task<List<Order>> GetAllOrders()
        {
            return await _orderRepository.GetAllOrders();
        }

        public List<OrdersDto> GetOrderByUserId(int userId)
        {
            return _orderRepository.GetOrderByUserId(userId);
        }
        public async Task<bool> AssignDeliveryPartnerToOrderAsync(int orderId, int deliveryPartnerId)
        {
            try
            {
                return await _orderRepository.AssignDeliveryPartnerToOrderAsync(orderId, deliveryPartnerId);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error assigning delivery partner: {ex.Message}");
            }
        }

        public async Task<bool> UpdatePickUpTimeToOrder(int orderId, DateTime? pickedAt)
        {
            var result = await _orderRepository.UpdatePickUpTimeToOrder(orderId, pickedAt);
            return result;
        }

        public async Task<bool> UpdateDeliveryTimeToOrder(int orderId, DateTime? deliveredAt)
        {
            var result = await _orderRepository.UpdateDeliveryTimeToOrder(orderId, deliveredAt);
            return result;
        }

        public async Task<bool> UpdatePaymentStatus(int orderId, string paymentStatus)
        {
            var result = await _orderRepository.UpdatePaymentStatus(orderId, paymentStatus);
            return result;
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

            _orderRepository.SaveAsync();
            return true;
        }
        public bool UpdateOrderAcceptance(UpdateOrderStatusDto statusDto)
        {
            bool result = _orderRepository.UpdateOrderAcceptance(statusDto);
            return result;
        }
    }  
}
