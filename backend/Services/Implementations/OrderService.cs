using backend.DTOs;
using backend.Models;
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
            var foodItems = await _foodItemRepository.GetListOfMenuItemByRestaurantIdAsync(placeOrderDto.RestaurantId);

            Order newOrder = new Order
            {
                CustomerId = placeOrderDto.CustomerId,
                RestaurantId = placeOrderDto.RestaurantId,
                Address = placeOrderDto.AddressId,
                CreatedAt = DateTime.Now,
                Status = "Pending", 
                PaymentStatus = "Pending", 
                TotalAmount = 0
            };

            decimal totalAmount = 0;

            foreach (var item in placeOrderDto.OrderItems)
            {
                var foodItem = foodItems.FirstOrDefault(fi => fi.Id == item.FoodItemId);
                if (foodItem == null)
                {
                    throw new Exception($"Food item with ID {item.FoodItemId} not found.");
                }

                totalAmount += foodItem.Price * item.Quantity;

                newOrder.OrderItems.Add(new OrderItem
                {
                    FoodItemId = item.FoodItemId,
                    Quantity = item.Quantity,
                    Price = foodItem.Price
                });
            }

            newOrder.TotalAmount = totalAmount;

            _orderRepository.AddOrder(newOrder);
            _orderRepository.SaveAsync();

            return true;
        }
        public OrdersDto GetOrderByOrderId(int orderId)
        {
            var order = _orderRepository.GetOrderByOrderId(orderId);

            if (order == null)
                return null;

            var orderDto = new OrdersDto
            {
                OrderId = order.Id,
                CustomerName = order.Customer?.Name,
                Restaurantname = order.Restaurant?.Name,
                TotalAmount = order.TotalAmount,
                Status = order.Status,
                PaymentStatus = order.PaymentStatus,
                PickedAt = order.PickedAt,
                DeliveredAt = order.DeliveredAt,
                DeliveryPartnerId = order.DeliveryPartnerId,
                OrderItems = order.OrderItems?.Select(item => new OrderItemDto
                {
                    Id = item.Id,
                    FoodItemId = item.FoodItemId ?? 0,
                    Quantity = item.Quantity,
                    Price = item.Price,
                }).ToList() ?? new List<OrderItemDto>()
            };

            return orderDto;
        }

        public List<OrdersDto> GetOrderByUserId(int userId)
        {
            return _orderRepository.GetOrderByUserId(userId);
        }
        public bool AssignDeliveryPartnerToOrder(int orderId, int deliveryPartnerId)
        {
            var order = _orderRepository.GetOrderByOrderId(orderId);
            if (order == null)
                return false; 

            order.DeliveryPartnerId = deliveryPartnerId;
             var deliveryIncentive = (int)(order.TotalAmount * 0.10m);

            var deliveryRequest = new DeliveryRequest
            {
                OrderId = orderId,
                DeliveryPartnerId = deliveryPartnerId,
                DeliveryInsentive = deliveryIncentive,
                CreatedAt = DateTime.Now
            };
            _orderRepository.AddDeliveryRequest(deliveryRequest);
            _orderRepository.SaveAsync();

            return true; 
        }

        public bool UpdatePickUpTimeToOrder(int orderId, DateTime? pickedAt)
        {
            var order = _orderRepository.GetOrderByOrderId(orderId);
            if (order == null) return false;

            order.PickedAt = pickedAt;
            _orderRepository.SaveAsync();
            return true;
        }
        public bool UpdateDeliveryTimeToOrder(int orderId, DateTime? deliveredAt)
        {
            var order = _orderRepository.GetOrderByOrderId(orderId);
            if (order == null) return false;

            order.DeliveredAt = deliveredAt;
            _orderRepository.SaveAsync();
            return true;
        }
        public bool UpdatePaymentStatus(int orderId, string paymentStatus)
        {
            var order = _orderRepository.GetOrderByOrderId(orderId);

            if (order == null) return false;

            order.PaymentStatus = paymentStatus;

            _orderRepository.SaveAsync();
            return true;
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

    }  
}
