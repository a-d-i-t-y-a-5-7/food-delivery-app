using backend.DTOs;
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
                Restaurant newrestaurant = new Restaurant
                {
                    OwnerId = restaurantDto.OwnerId,
                    Name = restaurantDto.Name,
                    PhoneNumber = restaurantDto.PhoneNumber,
                    Rating = restaurantDto.Rating,
                    OpeningTime = restaurantDto.OpeningTime,
                    ClosingTime = restaurantDto.ClosingTime,
                    IsApproved = restaurantDto.IsApproved,
                    IsActive = restaurantDto.IsActive,
                };
                Restaurant newResturent = await _restaurantServices.AddRestaurantAsync(newrestaurant);
                var result = new
                {
                    Id = newResturent.Id,
                    Name = newResturent.Name,
                    PhoneNumber = newrestaurant.PhoneNumber,
                    Rating = newrestaurant.Rating,
                    OpningTime = newrestaurant.OpeningTime,
                    ClosingTime = newrestaurant.ClosingTime,
                    IsAprroved = newrestaurant.IsApproved,
                    IsActive = newrestaurant.IsActive,
                };
                return Ok(new {succeessMessage ="Restaurant Added Successfully" , response = result});
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
