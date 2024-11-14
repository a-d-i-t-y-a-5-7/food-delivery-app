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
        public IActionResult PlaceOrder([FromBody] PlaceOrderDto placeOrderDto)
        {
            if (placeOrderDto == null)
            {
                return BadRequest(new { message = "Order data is required" });
            }
            if (placeOrderDto.CustomerId <= 0 || placeOrderDto.RestaurantId <= 0 || placeOrderDto.TotalAmount <= 0)
            {
                return BadRequest(new { message = "Invalid input data" });
            }

            var result = _orderService.PlaceOrder(placeOrderDto);

            if (result != null)
            {
                return CreatedAtAction(nameof(GetOrderByOrderId), new { orderId = result.OrderId }, result);
            }

            return BadRequest(new { message = "Order creation failed" });
        }
        [HttpGet("get-orders/{orderId}")]
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
