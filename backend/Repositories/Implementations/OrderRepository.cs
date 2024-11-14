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

        public void Save()
        {
            _context.SaveChanges();
        }
        public void Add(Order order)
        {
            _context.Orders.Add(order);
        }
        public Order GetOrderByOrderId(int orderId)
        {
            return _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.Restaurant)
                .FirstOrDefault(o => o.Id == orderId);
        }
        public List<OrdersDto> GetOrderByUserId(int userId)
        {
            List<Order>? orders = _context.Orders.Where(o => o.CustomerId == userId).ToList();
            List<OrdersDto> ordersDtos = new List<OrdersDto>();
            if (orders != null && orders.Count > 0)
            {
                for (int i = 0; i < orders.Count; i++)
                {
                    OrdersDto dto = new OrdersDto
                    {
                        OrderId = orders[i].Id,
                        Restaurantname = _context.Restaurants.Find(orders[i].RestaurantId).Name,
                        CustomerName = _context.Users.Find(orders[i].CustomerId).Name,
                        TotalAmount = orders[i].TotalAmount,
                        Status = orders[i].Status,
                        PaymentStatus = orders[i].PaymentStatus
                    };
                    ordersDtos.Add(dto);
                }
            }
            return ordersDtos;
        }
    }
}
