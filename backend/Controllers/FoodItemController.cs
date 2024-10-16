﻿using backend.DTOs;
using backend.Models;
using backend.Services.Implementations;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodItemController : ControllerBase
    {
        private readonly IFoodItemServices _foodItemServices;

        public FoodItemController(IFoodItemServices foodItemServices)
        {
            _foodItemServices = foodItemServices;
        }

        [HttpDelete("delete-menu-item/{id}")]
        public IActionResult DeleteFoodItem(int id)
        {
            bool result = _foodItemServices.DeleteFoodItem(id);

            if (result)
            {
                return StatusCode(204, new { message = "Food Item Deleted Successfuly" });
            }

            return StatusCode(404, new { message = "Food Item Not Found" });
        }

        [HttpPost("AddmenuItem/{restaurantId}")]
        public async Task<IActionResult> AddMenuItem(int restaurantId, [FromBody] FoodItemDto foodItemDto)
        {
            if (restaurantId <= 0 || foodItemDto == null)
            {
                return BadRequest("Invalid Food Item Details");
            }
            try
            {
                FoodItem newFoodItem = new FoodItem
                {
                    RestaurantId = foodItemDto.RestaurantId,
                    Name = foodItemDto.Name,
                    Description = foodItemDto.Description,
                    CuisineTypeId = foodItemDto.CuisineTypeId,
                    Price = foodItemDto.Price,
                    ImageUrl = foodItemDto.ImageUrl,
                    CategoryId = foodItemDto.CategoryId,
                    IsAvailable = foodItemDto.IsAvailable
                };
                FoodItem newlyAddedfoodItem = await _foodItemServices.AddMenuItemAsync(restaurantId,newFoodItem);
                var result = new
                {
                    Id = newlyAddedfoodItem.Id,
                    RestaurantId = newlyAddedfoodItem.RestaurantId,
                    Name = newlyAddedfoodItem.Name,
                    Description = newlyAddedfoodItem.Description,
                    CuisineTypeId = newlyAddedfoodItem.CuisineTypeId,
                    Price = newlyAddedfoodItem.Price,
                    ImageUrl = newlyAddedfoodItem.ImageUrl,
                    CategoryId = newlyAddedfoodItem.CategoryId,
                    IsAvailable = newlyAddedfoodItem.IsAvailable
                };
                return Ok(new { succeessMessage = "MenuItem Added Successfully", response = result });
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

        [HttpPut("UpdateMenuItemById/{menuItemId}")]
        public async Task<IActionResult> UpdateMenuItem(int menuItemId, [FromBody] FoodItemDto foodItemDto)
        {
            if (menuItemId <= 0 || foodItemDto == null)
            {
                return BadRequest(new { errorMessage = "Invalid menuItem Data" });
            }
            try
            {
                FoodItem UpdateFoodItem = new FoodItem
                {
                    Name = foodItemDto.Name,
                    Description = foodItemDto.Description,
                    CuisineTypeId = foodItemDto.CuisineTypeId,
                    Price = foodItemDto.Price,
                    ImageUrl = foodItemDto.ImageUrl,
                    CategoryId = foodItemDto.CategoryId,
                    IsAvailable = foodItemDto.IsAvailable
                };
               bool isFoodItemUpdated = await _foodItemServices.UpdateMenuItembyIdAsync(menuItemId, UpdateFoodItem);
                if (isFoodItemUpdated)
                {
                    return Ok(new { succeessMessage = "MenuItem Updated Successfully" });
                }
                else
                {
                    return NotFound(new { errorMessage = "Menu Item Not Found" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { errorMessage = "Internal Server Error.", ex.Message });
            }
        }

        [HttpGet("GetListofmenuItemByRestaurant/{restaurantId}")]
        public async Task<IActionResult> GetMenuItem(int restaurantId)
        {
            if (restaurantId <= 0)
            {
                return BadRequest(new { errorMessage = "Invalid restaurant Id" });
            }
            try
            {
                IEnumerable<FoodItem> foodItemsList = await _foodItemServices.GetListOfMenuItemByRestaurantIdAsync(restaurantId);
                if (!foodItemsList.Any())
                {
                    return NotFound(new { errorMessage = "Menu Items Not Found" });
                }
                return Ok(foodItemsList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { errorMessage = "Internal Server Error.", ex.Message });
            }

        }
    }
}
