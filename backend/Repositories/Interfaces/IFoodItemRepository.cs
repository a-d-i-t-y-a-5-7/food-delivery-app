using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IFoodItemRepository
    {
        public bool DeleteFoodItem(int id);
        Task<FoodItem> AddMenuItemAsync(int restaurantId, FoodItem foodItemdItem);
        Task<bool> UpdateMenuItembyIdAsync(int menuItemId, FoodItem foodItem);
        Task<IEnumerable<FoodItem>> GetListOfMenuItemByRestaurantIdAsync(int resturentId);
    }
}
