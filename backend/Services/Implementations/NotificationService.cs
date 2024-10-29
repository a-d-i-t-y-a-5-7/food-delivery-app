using backend.DTOs;
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services.Implementations
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _notificationRepository;
        private readonly IAdminRepository _adminRepository;

        public NotificationService(INotificationRepository notificationRepository, IAdminRepository adminRepository)
        {
            _notificationRepository = notificationRepository;
            _adminRepository = adminRepository;
        }

        public bool SendNotificationToSingleUser(NotificationDto notificationDto)
        {
            var admin = _adminRepository.GetAdminById(notificationDto.AdminId);
            if (admin == null || (admin.Level != 2 && admin.Level != 3))
            {
                return false;
            }

            var notification = new Notification
            {
                AdminId = notificationDto.AdminId,
                SentToUserId = notificationDto.SentToUserId,
                NotificationText = notificationDto.NotificationText,
                RedirectionLink = notificationDto.RedirectionLink,
                CreatedAt = DateTime.Now
            };

            _notificationRepository.AddNotification(notification);
            _notificationRepository.Save();
            return true;
        }

        public bool SendNotificationToMultipleUsers(MultiUserNotificationDto multiUserNotificationDto)
        {
            var admin = _adminRepository.GetAdminById(multiUserNotificationDto.AdminId);
            if (admin == null || (admin.Level != 2 && admin.Level != 3))
            {
                return false; 
            }

            foreach (var userId in multiUserNotificationDto.SentToUserIds)
            {
                var notification = new Notification
                {
                    AdminId = multiUserNotificationDto.AdminId,
                    SentToUserId = userId,
                    NotificationText = multiUserNotificationDto.NotificationText,
                    RedirectionLink = multiUserNotificationDto.RedirectionLink,
                    CreatedAt = DateTime.Now
                };

                _notificationRepository.AddNotification(notification);
            }

            _notificationRepository.Save();
            return true;
        }
    }
}
