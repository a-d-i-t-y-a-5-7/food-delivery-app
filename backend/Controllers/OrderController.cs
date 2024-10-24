using backend.DTOs;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPut("update-status")]
        public IActionResult UpdateOrderStatus([FromBody] UpdateOrderStatusDto updateOrderStatusDto)
        {
            bool result = _orderService.UpdateOrderStatus(updateOrderStatusDto);

            if (result)
            {
                return Ok(new { message = "Order status updated successfully" });
            }

            return BadRequest(new { message = "Order not found or status update failed" });
        }
    }
}
