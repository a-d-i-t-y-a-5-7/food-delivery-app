using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface INotificationRepository
    {
        void AddNotification(Notification notification);
        void Save();
    }
}
