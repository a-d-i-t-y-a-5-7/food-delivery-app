using backend.Models;
using backend.Repositories.Interfaces;
using System;

namespace backend.Repositories.Implementations
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly FoodDeliveryDbContext _context;

        public NotificationRepository(FoodDeliveryDbContext context)
        {
            _context = context;
        }

        public void AddNotification(Notification notification)
        {
            _context.Notifications.Add(notification);
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
