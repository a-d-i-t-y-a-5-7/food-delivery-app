﻿using backend.Models;
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

        public DeliveryPartnerController(IDeliveryPartnerServices deliveryPartnerServices)
        {
            _deliveryPartnerServices = deliveryPartnerServices;
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
    }
}
