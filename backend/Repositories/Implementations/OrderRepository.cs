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
        public void AddDeliveryRequest(DeliveryRequest deliveryRequest)
        {
            _context.DeliveryRequests.Add(deliveryRequest);
        }
        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<List<User>> GetDeliveryPartners()
        {
            var deliveryPartners = await _context.Users
                .Where(u => u.RoleId == 1005)
                .ToListAsync();

            return deliveryPartners;
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
                    TotalAmount = 0,
                };

                decimal totalAmount = 0;
                foreach (var item in placeOrderDto.OrderItems)
                {
                    
                var foodItem = foodItems.FirstOrDefault(fi => fi.Id == item.FoodItemId) ?? throw new Exception($"Food item with ID {item.FoodItemId} not found.");
                    if (item.Quantity > foodItem.Quantity)
                        {

                    Exception exception = new Exception($"Food item '{foodItem.Name}' is out of stock. Only {foodItem.Quantity} items are available.");
throw exception;
                }

                    totalAmount += foodItem.Price * item.Quantity;
                    newOrder.OrderItems.Add(new OrderItem
                    {
                        FoodItemId = item.FoodItemId,
                        Quantity = item.Quantity,
                        Price = foodItem.Price
                    });

                    foodItem.Quantity -= item.Quantity;
                }

                newOrder.TotalAmount = totalAmount;
            _context.Orders.Add(newOrder);
            await _context.SaveChangesAsync();
            placeOrderDto.OrderId = newOrder.Id;

            return true;
                   }
        public async Task<bool> AssignDeliveryPartnerToOrderAsync(int orderId, int deliveryPartnerId)
        {
            var order = await _context.Orders
                .FirstOrDefaultAsync(o => o.Id == orderId);

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

            _context.DeliveryRequests.Add(deliveryRequest);


            await _context.SaveChangesAsync();

            return true;
        }
        public async Task<List<Order>> GetAllOrders()
        {
            return await _context.Orders.ToListAsync();
        }
        public OrdersDto GetOrderByOrderId(int orderId)
        {
            var order = _context.Orders
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.FoodItem)
                .Include(o => o.Customer)
                .Include(o => o.Restaurant)
                .FirstOrDefault(o => o.Id == orderId);

            if (order == null)
                return null;

            return new OrdersDto
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
                    FoodItemName = item.FoodItem?.Name,  
                    FoodItemImageUrl = item.FoodItem?.ImageUrl,
                    Description = item.FoodItem?.Description,
                    Quantity = item.Quantity,
                    Price = item.Price,
                }).ToList() ?? new List<OrderItemDto>()
            };
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
                            FoodItemName = item.FoodItem?.Name, 
                            FoodItemImageUrl = item.FoodItem?.ImageUrl,
                            Description = item.FoodItem?.Description,
                            Quantity = item.Quantity,
                            Price = item.Price,
                        }).ToList()
                    };
                    ordersDtos.Add(dto);
                }
            }
            return ordersDtos;
        }
        public async Task<bool> UpdatePickUpTimeToOrder(int orderId, DateTime? pickedAt)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == orderId);
            if (order == null) return false;

            order.PickedAt = pickedAt;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateDeliveryTimeToOrder(int orderId, DateTime? deliveredAt)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == orderId);
            if (order == null) return false;

            order.DeliveredAt = deliveredAt;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdatePaymentStatus(int orderId, string paymentStatus)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == orderId);
            if (order == null) return false;

            order.PaymentStatus = paymentStatus;
            await _context.SaveChangesAsync();
            return true;
        }


        public bool UpdateOrderAcceptance(UpdateOrderStatusDto statusDto)
        {
            Order? order = _context.Orders.Find(statusDto.OrderId);
            if (order == null || !order.Status.Equals("Pending"))
            {
                return false;
            }

            order.Status = statusDto.Status;
            _context.SaveChanges();
            return true;
        }

    }
}
