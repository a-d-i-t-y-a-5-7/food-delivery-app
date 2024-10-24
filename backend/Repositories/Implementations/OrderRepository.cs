using backend.Models;
using backend.Repositories.Interfaces;
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

        public Order? GetOrderById(int orderId)
        {
            return _context.Orders.FirstOrDefault(o => o.Id == orderId);
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
