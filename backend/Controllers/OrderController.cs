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
        public IActionResult GetOrderByUserId(int userId)
        {
            List<OrdersDto> orders = _orderService.GetOrderByUserId(userId);

            if (orders == null || orders.Count == 0)
            {
                return NotFound(new { message = "Orders not found for the user" });
            }
            return Ok(new { orders });
        }
        [HttpPatch("assign-delivery-partner")]
        public async Task<IActionResult> AssignDeliveryPartner([FromBody] AssignDeliveryPartnerDto dto)
        {
            var result = await _orderService.AssignDeliveryPartnerToOrderAsync(dto.OrderId, dto.DeliveryPartnerId);

            if (result)
            {
                return Ok(new { message = "Delivery Partner assigned successfully" });
            }

            return BadRequest(new { message = "Failed to assign Delivery Partner" });
        }
        [HttpPatch("update-order-pickupTime")]
        public async Task<IActionResult> UpdateOrderPickUpTime([FromBody] UpdateOrderPickUpTimeDto dto)
        {
            var result = await _orderService.UpdatePickUpTimeToOrder(dto.OrderId, dto.PickedAt);

            if (result)
            {
                return Ok(new { message = "PickUp Time updated successfully" });
            }

            return BadRequest(new { message = "Failed to update PickUp Time" });
        }
        [HttpPatch("update-order-deliveryTime")]
        public async Task<IActionResult> UpdateOrderDeliveryUpTime([FromBody] UpdateOrderDeliveryTimeDto dto)
        {
            var result = await _orderService.UpdateDeliveryTimeToOrder(dto.OrderId, dto.DeliveredAt);

            if (result)
            {
                return Ok(new { message = "Delivery Time updated successfully" });
            }

            return BadRequest(new { message = "Failed to update Delivery Time" });
        }

        [HttpPatch("update-paymentstatus")]
        public async Task<IActionResult> UpdatePaymentStatus([FromBody] UpdatePaymentStatusDto dto)
        {
            var result = await _orderService.UpdatePaymentStatus(dto.OrderId, dto.PaymentStatus);

            if (result)
            {
                return Ok(new { message = "Payment Status updated successfully" });
            }

            return BadRequest(new { message = "Failed to update Payment Status" });
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
