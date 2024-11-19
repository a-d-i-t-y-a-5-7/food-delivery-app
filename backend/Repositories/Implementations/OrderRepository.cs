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
        public void AddOrder(Order order)
        {
            _context.Orders.Add(order);
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
