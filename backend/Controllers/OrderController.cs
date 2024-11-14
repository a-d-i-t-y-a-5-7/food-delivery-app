using backend.DTOs;
using backend.Services.Implementations;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

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
        [HttpPost("place-order")]
        public async Task<IActionResult> PlaceOrder([FromBody] PlaceOrderDto placeOrderDto)
        {
            var result = await _orderService.PlaceOrderAsync(placeOrderDto);
            if (result)
            {
                return Ok(new { message = "Order placed successfully" });
            }
            return BadRequest(new { message = "Failed to place order" });
        }

        [HttpGet("{orderId}")]
        public IActionResult GetOrderByOrderId(int orderId)
        {
            var order = _orderService.GetOrderByOrderId(orderId);

            if (order != null)
            {
                return Ok(order); 
            }

            return NotFound(new { message = "Order not found" });
        }

        [HttpGet("get-orders/{userId}")]
        public IActionResult GetOrders(int userId)
        {
            List<OrdersDto> orders = _orderService.GetOrderByUserId(userId);
            if (orders.IsNullOrEmpty())
            {
                return StatusCode(404, new { message = "User Not Found" });
            }
            return StatusCode(200, new { orders = orders });
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
