using backend.DTOs;
using backend.Models;

namespace backend.Services.Interfaces
{
    public interface IFoodItemServices
    {
        FoodItem GetFoodItemById(int id);
        public bool DeleteFoodItem(int id);
        Task<bool> AddMenuItem(int restaurantId, FoodItemDto foodItemdItem, IFormFile? formFile);
        Task<bool> UpdateMenuItembyIdAsync(int menuItemId, FoodItemDto foodItem,IFormFile? formFile);
        Task<IEnumerable<FoodItem>> GetListOfMenuItemByRestaurantIdAsync(int resturentId);
        Task<CuisineAndCategoryListDto> GetCategoryAndCuisineList();
        Task<bool> UpdateMenuItemPrice(int menuItemId, FoodItemPriceDto foodItemPriceDto);
        Task<bool> AddCategory(string categoryName);
        Task<IEnumerable<CategoryDto>> GetAllCategoryList();
    }
}
