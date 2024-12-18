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

        public async Task<bool> AddMenuItem(int restaurantId, FoodItemDto foodItemDto, IFormFile image)
        {
            FoodItem newFoodItem = new FoodItem
            {
                RestaurantId = restaurantId,
                Name = foodItemDto.Name,
                Description = foodItemDto.Description,
                CuisineTypeId = foodItemDto.CuisineTypeId,
                Price = foodItemDto.Price,
                CategoryId = foodItemDto.CategoryId,
                IsAvailable = foodItemDto.IsAvailable
            };
            bool result = await _foodItemRepo.AddMenuItemAsync(newFoodItem,image);
            return result;
        }

        public async Task<bool> UpdateMenuItembyIdAsync(int menuItemId ,FoodItemDto foodItemDto,IFormFile file)
        {
            FoodItem UpdateFoodItem = new FoodItem
            {
                RestaurantId = foodItemDto.RestaurantId,
                Name = foodItemDto.Name,
                Description = foodItemDto.Description,
                CuisineTypeId = foodItemDto.CuisineTypeId,
                Price = foodItemDto.Price,
                CategoryId = foodItemDto.CategoryId,
                IsAvailable = foodItemDto.IsAvailable
            };
            bool UpdatedFoodItem = await _foodItemRepo.UpdateMenuItembyIdAsync(menuItemId , UpdateFoodItem,file);
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

        public async Task<bool> UpdateMenuItemPrice(int menuItemId, FoodItemPriceDto foodItemPriceDto)
        {
            bool result = await _foodItemRepo.UpdateMenuItemPriceAsync(menuItemId,foodItemPriceDto);
            return result;
        }

        public async Task<bool> AddCategory(string categoryName)
        {
            bool result  = await _foodItemRepo.AddCategoryAsync(categoryName);  
            return result;
        }

        public async Task<IEnumerable<CategoryDto>> GetAllCategoryList()
        {
            IEnumerable<CategoryDto> categoryDtosList = await _foodItemRepo.GetAllCategoryAsync();
            return categoryDtosList;
        }

    }
}
