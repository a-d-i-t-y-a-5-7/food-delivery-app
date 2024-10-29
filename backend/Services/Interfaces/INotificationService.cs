using backend.DTOs;

namespace backend.Services.Interfaces
{
    public interface INotificationService
    {
        bool SendNotificationToSingleUser(NotificationDto notificationDto);
        bool SendNotificationToMultipleUsers(MultiUserNotificationDto multiUserNotificationDto);
    }
}
