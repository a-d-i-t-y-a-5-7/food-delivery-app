using backend.DTOs;
using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IFoodItemRepository
    {
        FoodItem GetFoodItemById(int id); 
        public bool DeleteFoodItem(int id);
        Task<bool> AddMenuItemAsync(FoodItem foodItemdItem,IFormFile formFile);
        Task<bool> UpdateMenuItembyIdAsync(int menuItemId, FoodItem foodItem,IFormFile formFile);
        Task UpdateMenuItem(FoodItem foodItem);
        Task<IEnumerable<FoodItem>> GetListOfMenuItemByRestaurantIdAsync(int resturentId);
        Task<FoodItem?> GetMenuItemByIdAsync(int menuItemId);
        Task<CuisineAndCategoryListDto> GetCuisineAndCategoryList();
        Task<bool> UpdateMenuItemPriceAsync(int menuItemId,FoodItemPriceDto foodItemPriceDto);
        Task<bool> AddCategoryAsync(string  categoryName);
        Task<IEnumerable<CategoryDto>> GetAllCategoryAsync();
    }
}
