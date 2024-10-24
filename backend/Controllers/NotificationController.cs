using backend.DTOs;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        // API to send notification to a single user
        [HttpPost("send-notification/single")]
        public IActionResult SendNotificationToSingleUser([FromBody] NotificationDto notificationDto)
        {
            bool result = _notificationService.SendNotificationToSingleUser(notificationDto);

            if (result)
            {
                return Ok(new { message = "Notification sent to user" });
            }

            return BadRequest(new { message = "Failed to send notification" });
        }

        // API to send notification to multiple users
        [HttpPost("send-notification/multiple")]
        public IActionResult SendNotificationToMultipleUsers([FromBody] MultiUserNotificationDto multiUserNotificationDto)
        {
            bool result = _notificationService.SendNotificationToMultipleUsers(multiUserNotificationDto);

            if (result)
            {
                return Ok(new { message = "Notifications sent to users" });
            }

            return BadRequest(new { message = "Failed to send notifications" });
        }
    
}
}
