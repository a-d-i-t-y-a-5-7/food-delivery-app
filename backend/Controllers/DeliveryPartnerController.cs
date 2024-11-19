using backend.DTOs;
using backend.Models;
using backend.Services.Implementations;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryPartnerController : ControllerBase
    {
        private readonly IDeliveryPartnerServices _deliveryPartnerServices;
        private readonly IDeliveryRequestService _deliveryRequestService;

        public DeliveryPartnerController(IDeliveryPartnerServices deliveryPartnerServices, IDeliveryRequestService deliveryRequestService)
        {
            _deliveryPartnerServices = deliveryPartnerServices;
            _deliveryRequestService = deliveryRequestService;
        }

        [HttpPost("register/delivery-partner")]
        public IActionResult AddDeliveryPartner(User deliveryPartner)
        {
            bool result = _deliveryPartnerServices.AddDeliveryPartner(deliveryPartner);

            if (result)
            {
                return StatusCode(201, new {deliveryPartnerId = deliveryPartner.Id});
            }

            return StatusCode(400, new { message = "Delivery Partner Already Exists" });
        }

        [HttpGet("{deliveryPartnerId}/orders")]
        public IActionResult GetOrdersByDeliveryPartner(int deliveryPartnerId)
        {
            var result = _deliveryPartnerServices.GetOrdersByDeliveryPartner(deliveryPartnerId);

            if (result != null)
            {
                return Ok(result);
            }

            return NotFound(new { message = "Delivery Partner or Orders Not Found" });
        }

        [HttpPost("accept-delivery-request")]
        public IActionResult AcceptDeliveryRequest([FromBody] DeliveryRequestDto deliveryRequestDto)
        {
            _deliveryRequestService.AddDeliveryRequest(deliveryRequestDto);
            return StatusCode(201, new { message = "Delivery request added successfully." });
        }

        [HttpDelete("reject-delivery-request/{id}")]
        public IActionResult DeleteDeliveryRequest(int id)
        {
            try
            {
                _deliveryRequestService.DeleteDeliveryRequest(id);
                return Ok(new { message = "Delivery request deleted successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while deleting the delivery request.", error = ex.Message });
            }
        }

        [HttpPatch("toggle-active-status/{id}")]
        public IActionResult ToggleIsActiveStatus(int id)
        {
            bool result = _deliveryPartnerServices.ToggleIsActiveStatus(id);

            if (result)
            {
                return Ok(new { message = "Delivery partner active status toggled successfully." });
            }
            else
            {
                return NotFound(new { message = "Delivery partner not found." });
            }
        }

        [HttpGet("{deliveryPartnerId}/total-incentive")]
        public IActionResult GetTotalDeliveryIncentive(int deliveryPartnerId)
        {
            var totalIncentive = _deliveryRequestService.GetTotalDeliveryIncentive(deliveryPartnerId);

            return Ok(new { DeliveryPartnerId = deliveryPartnerId, TotalDeliveryIncentive = totalIncentive });
        }
    }
}
