using backend.DTOs;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;

namespace backend.Repositories.Implementations
{
    public class OrderRepository : IOrderRepository
    {
        private readonly FoodDeliveryDbContext _context;

        public OrderRepository(FoodDeliveryDbContext context)
        {
            _context = context;
        }
        public async Task<bool> PlaceOrderAsync(PlaceOrderDto placeOrderDto)
        {

            var foodItems = await _context.FoodItems
                .Where(fi => fi.RestaurantId == placeOrderDto.RestaurantId)
                .ToListAsync();

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

               
                if (item.Quantity > foodItem.quantity)
                {
                    
                    throw new Exception($"Food item '{foodItem.Name}' is out of stock. Only {foodItem.quantity} items are available.");
                }

                
                totalAmount += foodItem.Price * item.Quantity;
                newOrder.OrderItems.Add(new OrderItem
                {
                    FoodItemId = item.FoodItemId,
                    Quantity = item.Quantity,
                    Price = foodItem.Price
                });

               
                foodItem.quantity -= item.Quantity;
            }

            newOrder.TotalAmount = totalAmount;
            _context.Orders.Add(newOrder);
            await _context.SaveChangesAsync();

            return true;
        }

        public void AddDeliveryRequest(DeliveryRequest deliveryRequest)
        {
            _context.DeliveryRequests.Add(deliveryRequest);
        }
        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();  
        }

        public Order GetOrderByOrderId(int orderId)
        {
            return _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.Restaurant)
                .Include(o => o.OrderItems) 
                .ThenInclude(oi => oi.FoodItem) 
                .FirstOrDefault(o => o.Id == orderId);
        }

        public List<OrdersDto> GetOrderByUserId(int userId)
        {
            var orders = _context.Orders
                .Include(o => o.OrderItems) 
                .ThenInclude(oi => oi.FoodItem) 
                .Where(o => o.CustomerId == userId)
                .ToList();

            List<OrdersDto> ordersDtos = new List<OrdersDto>();
            if (orders != null && orders.Count > 0)
            {
                foreach (var order in orders)
                {
                    OrdersDto dto = new OrdersDto
                    {
                        OrderId = order.Id,
                        Restaurantname = _context.Restaurants.Find(order.RestaurantId)?.Name,
                        CustomerName = _context.Users.Find(order.CustomerId)?.Name,
                        TotalAmount = order.TotalAmount,
                        Status = order.Status,
                        PaymentStatus = order.PaymentStatus,
                        PickedAt = order.PickedAt,
                        DeliveredAt = order.DeliveredAt,
                        DeliveryPartnerId = order.DeliveryPartnerId,
                        OrderItems = order.OrderItems.Select(item => new OrderItemDto
                        {
                            Id = item.Id,
                            FoodItemId = item.FoodItemId ?? 0,
                            Quantity = item.Quantity,
                            Price = item.Price,
                        }).ToList()
                    };
                    ordersDtos.Add(dto);
                }
            }
            return ordersDtos;
        }

    }
}
