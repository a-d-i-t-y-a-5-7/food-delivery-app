using backend.DTOs;
using backend.Helper;
using backend.Models;
using backend.Services.Interfaces;
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
        public async Task<IActionResult> AddMenuItem(int restaurantId, [FromForm] FoodItemDto foodItemDto, IFormFile? image)
        {
            if (restaurantId <= 0 || foodItemDto == null)
            {
                return BadRequest("Invalid Food Item Details");
            }
            try
            {
                bool response = await _foodItemServices.AddMenuItem(restaurantId, foodItemDto,image);
                if (response)
                {
                    return StatusCode(201,new { succeessMessage = "MenuItem Added Successfully"});
                }
                else
                {
                    return BadRequest(new { errorMessage = "Failed To add Menu Item" });
                }

            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { errorMessage = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { errorMessage = "Internal Server Error."+ ex.Message });
            }

        }

        [HttpPut("UpdateMenuItemById/{menuItemId}")]
        public async Task<IActionResult> UpdateMenuItem(int menuItemId, [FromForm] FoodItemDto foodItemDto, IFormFile? image)
        {
            if (menuItemId <= 0 || foodItemDto == null)
            {
                return BadRequest(new { errorMessage = "Invalid menuItem Data" });
            }
            try
            {
                bool isFoodItemUpdated = await _foodItemServices.UpdateMenuItembyIdAsync(menuItemId, foodItemDto, image);
                if (isFoodItemUpdated)
                {
                    return Ok(new { succeessMessage = "MenuItem Updated Successfully" });
                }
                else
                {
                    return NotFound(new { errorMessage = "Menu Item Not Found" });
                }
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { errorMessage = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { errorMessage = "Internal Server Error."+ ex.Message });
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
                return StatusCode(500, new { errorMessage = "Internal Server Error."+ ex.Message });
            }

        }
        [HttpGet("GetListOfCuisineAndCategory")]
        public async Task<IActionResult> GetListOfCuisineAndCategory()
        {
            try
            {
                CuisineAndCategoryListDto cuisineAndCategoryList = await _foodItemServices.GetCategoryAndCuisineList();
                if (cuisineAndCategoryList != null)
                {
                    return Ok(cuisineAndCategoryList);
                }
                return NotFound();

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { errorMessage = "Internal Server Error."+ ex.Message });

            }

        }

        [HttpPatch("UpdateMenuItemPrice/{menuItemId}")]
        public async Task<IActionResult> UpdateMenuItemPrice(int menuItemId, [FromBody] FoodItemPriceDto foodItemPriceDto)
        {
            try
            {
                if (menuItemId <= 0 || foodItemPriceDto.Price <= 0)
                {
                    return BadRequest(new { errorMesasge = "Please Provied Valid Data" });
                }
                bool result = await _foodItemServices.UpdateMenuItemPrice(menuItemId, foodItemPriceDto);
                if (result)
                {
                    return Ok(new { message = "Menu Item Price Updated Succesfully" });
                }

                return BadRequest(new { errorMessage = "Failed to update Menu Item Price" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { errorMessage = "Internal Server Error."+ ex.Message });
            }
        }

        [HttpPost("AddCategory")]
        public async Task<IActionResult> AddCategory(string categoryName)
        {
            if (string.IsNullOrEmpty(categoryName))
            {
                return BadRequest(new { errorMessage = "Category can't be null" });
            }
            if (int.TryParse(categoryName, out _))
            {
                return BadRequest(new { errorMessage = "Category name cannot be a number" });
            }
            try
            {
                bool result = await _foodItemServices.AddCategory(categoryName);
                if (result)
                {
                    return Ok(new { message = "new category added" });
                }
                return BadRequest(new { errorMessage = "Failed To Add Category" });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { errorMessage = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { errorMessage = "Internal Server Error."+ ex.Message });
            }


        }
        [HttpGet("GetAllCategoriesList")]
        public async Task<IActionResult> GetAllCategoryList()
        {
            try
            {
                IEnumerable<CategoryDto> categoriesList = await _foodItemServices.GetAllCategoryList();
                if (!categoriesList.Any())
                {
                    return NotFound(new { errorMessage = "Categories List Not Found" });
                }
                return Ok(categoriesList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { errorMessage = "Internal Server Error."+ex.Message });
            }
        }
    }
}
