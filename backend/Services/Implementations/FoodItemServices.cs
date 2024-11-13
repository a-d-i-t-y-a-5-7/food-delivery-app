using backend.DTOs;
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services.Implementations
{
    public class FoodItemServices : IFoodItemServices
    {
        private readonly IFoodItemRepository _foodItemRepo;

        public FoodItemServices(IFoodItemRepository foodItemRepo)
        {
            _foodItemRepo = foodItemRepo;
        }

        public bool DeleteFoodItem(int id)
        {
            bool result = _foodItemRepo.DeleteFoodItem(id);
            return result;
        }

        public async Task<FoodItem> AddMenuItemAsync(int restaurantId, FoodItem foodItem)
        {
            FoodItem newFoodItem = await _foodItemRepo.AddMenuItemAsync(restaurantId,foodItem);
            return newFoodItem;
        }

        public async Task<bool> UpdateMenuItembyIdAsync(int menuItemId, FoodItem foodItem)
        {
            bool UpdatedFoodItem = await _foodItemRepo.UpdateMenuItembyIdAsync(menuItemId, foodItem);
            return UpdatedFoodItem;
        }

        public async Task<IEnumerable<FoodItem>> GetListOfMenuItemByRestaurantIdAsync(int resturentId)
        {
            IEnumerable<FoodItem> foodItemsList = await _foodItemRepo.GetListOfMenuItemByRestaurantIdAsync(resturentId);
            return foodItemsList;
        }
        public async Task<CuisineAndCategoryListDto> GetCategoryAndCuisineList()
        {
            CuisineAndCategoryListDto cuisineAndCategoryListDto = await _foodItemRepo.GetCuisineAndCategoryList();
            return cuisineAndCategoryListDto;
        }
    }
}
