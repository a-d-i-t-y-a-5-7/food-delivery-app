namespace backend.DTOs
{
    public class NotificationDto
    {
        public int AdminId { get; set; }
        public int SentToUserId { get; set; }
        public string NotificationText { get; set; }
        public string RedirectionLink { get; set; }
    }

}
