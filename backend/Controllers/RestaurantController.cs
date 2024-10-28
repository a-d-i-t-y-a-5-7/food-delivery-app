﻿using backend.DTOs;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantController : ControllerBase
    {
        private readonly IRestaurantServices _restaurantServices;

        public RestaurantController(IRestaurantServices restaurantServices)
        {
            _restaurantServices = restaurantServices;
        }

        [HttpGet("get-restaurants/{ownerId}")]
        public IActionResult GetRestaurant(int ownerId)
        {
            List<Restaurant> restaurants = _restaurantServices.GetRestaurants(ownerId);

            if(restaurants.IsNullOrEmpty())
            {
                return StatusCode(404, new { message = "Owner Not Found" });
            }

            return StatusCode(200, new { restaurants = restaurants });
        }

        [HttpGet("get-orders/{restaurantId}")]
        public IActionResult GetOrders(int restaurantId)
        {
            List<Order> orders = _restaurantServices.GetOrders(restaurantId);
            if (orders.IsNullOrEmpty())
            {
                return StatusCode(404, new { message = "Restaurant Not Found" });
            }
            return StatusCode(200, new { orders = orders });
        }

        [HttpPost("Register")]
        public async Task<IActionResult> AddRestaurant([FromBody] RestaurantDto restaurantDto)
        {
            if (restaurantDto == null)
            {
                return BadRequest("Invalid User Data");
            }
            try
            {
                RestaurantDto newRestaurant = await _restaurantServices.AddRestaurantAsync(restaurantDto);
                var result = new
                {
                    Name = newRestaurant.Name,
                    PhoneNumber = newRestaurant.PhoneNumber,
                    Rating = newRestaurant.Rating,
                    OpningTime = newRestaurant.OpeningTime,
                    ClosingTime = newRestaurant.ClosingTime,
                };
                return Ok(new {succeessMessage ="Restaurant Added Successfully"});
            }
            catch(ArgumentException ex)
            {
                return BadRequest(new { errorMessage = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { errorMessage = "Internal Server Error." ,ex.Message});
            }
        }
    }
}
//comment
 