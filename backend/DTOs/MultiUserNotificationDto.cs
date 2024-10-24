namespace backend.DTOs
{
    public class MultiUserNotificationDto
    {
        public int AdminId { get; set; }
        public List<int> SentToUserIds { get; set; }
        public string NotificationText { get; set; }
        public string RedirectionLink { get; set; }
    }

}
