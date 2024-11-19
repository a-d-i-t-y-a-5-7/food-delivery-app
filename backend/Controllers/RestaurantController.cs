using backend.DTOs;
using backend.Models;
using backend.Services.Interfaces;
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
        [HttpGet("get-all-restaurants")]
        public IActionResult GetAllRestaurants()
        {
            try
            {
                List<RestaurantDto> restaurants = _restaurantServices.GetAllRestaurants();

                if (restaurants.IsNullOrEmpty())
                {
                    return StatusCode(404, new { message = "No Restaurants Found" });
                }

                return Ok(new { restaurants = restaurants });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { errorMessage = "Internal Server Error", details = ex.Message });
            }
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
            List<OrdersDto> orders = _restaurantServices.GetOrders(restaurantId);
            if (orders.IsNullOrEmpty())
            {
                return StatusCode(404, new { message = "Restaurant Not Found" });
            }
            return StatusCode(200, new { orders = orders });
        }

        [HttpPost("Register")]
        public async Task<IActionResult> AddRestaurant([FromForm] RestaurantsDto restaurantDto ,IFormFile? image)
        {
            if (restaurantDto == null && image == null)
            {
                return BadRequest("Invalid User Data");
            }
            try
            {
                if (image != null && image.Length > 0)
                {
                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "..", "frontend", "public", "uploads","restaurant");
                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }
                    var imagePath = Path.Combine(uploadsFolder, image.FileName);

                    using (var stream = new FileStream(imagePath, FileMode.Create))
                    {
                        await image.CopyToAsync(stream);
                    }
                   string imageUrl = $"/uploads/restaurant/{image.FileName}";
                    restaurantDto.image_url = imageUrl;
                }
                RestaurantsDto newRestaurant = await _restaurantServices.AddRestaurantAsync(restaurantDto);

                var result = new
                {
                    Name = newRestaurant.Name,
                    PhoneNumber = newRestaurant.PhoneNumber,
                    Rating = newRestaurant.Rating,
                    OpeningTime = newRestaurant.OpeningTime,
                    ClosingTime = newRestaurant.ClosingTime,
                    ImageUrl = newRestaurant.image_url
                };

                return Ok(new { successMessage = "Restaurant Added Successfully", restaurant = result });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { errorMessage = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { errorMessage = "Internal Server Error.", ex.Message });
            }
        }
    

        [HttpPut("approve-reject/{id}/{status}")]
        public IActionResult UpdateRestaurantApprovalStatus(int id, bool status)
        {
            bool result = _restaurantServices.UpdateRestaurantApprovalStatus(id, status);

            if (result)
            {
                return Ok(new { message = status ? "Restaurant approved" : "Restaurant rejected and deleted" });
            }

            return BadRequest(new { message = "Failed to update restaurant approval status" });
        }

        [HttpPut("update-restaurant")]
        public IActionResult UpdateRestaurant(RestaurantDto restaurant)
        {
            Request.Headers.TryGetValue("Authorization", out var jwt);
            string? token = jwt.FirstOrDefault()?.Split(" ").Last();
            if (token != null)
            {
                bool result = _restaurantServices.UpdateRestaurant(token, restaurant);
                if (result)
                {
                    return StatusCode(204, new { message = "Restaurant Details Updated" });
                }
                return StatusCode(400, new { message = "Failed to update the the restaurant details" });
            }

            return StatusCode(400, new { message = "Please Login First" });
        }

        [HttpPatch("update-active-status")]
        public IActionResult UpdateActiveStatus([FromHeader]int restaurantId)
        {
            Request.Headers.TryGetValue("Authorization", out var jwt);
            string? token = jwt.FirstOrDefault()?.Split(" ").Last();

            if (token != null)
            {
                bool result = _restaurantServices.UpdateActiveStatus(token, restaurantId);
                if (result)
                {
                    return StatusCode(204);
                }
                return StatusCode(400, new { message = "Failed to update status" });
            }

            return StatusCode(401, new { message = "Please Login" });
        }
    }
}
//comment
