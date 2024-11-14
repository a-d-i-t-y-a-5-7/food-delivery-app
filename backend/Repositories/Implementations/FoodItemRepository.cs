using backend.DTOs;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.Implementations
{
    public class FoodItemRepository : IFoodItemRepository
    {
        private readonly FoodDeliveryDbContext _Dbcontext;

        public FoodItemRepository(FoodDeliveryDbContext context)
        {
            _Dbcontext = context;
        }

        public bool DeleteFoodItem(int id)
        {
            FoodItem? item = _Dbcontext.FoodItems.Find(id);

            if (item == null)
            {
                return false;
            }

            _Dbcontext.FoodItems.Remove(item);
            _Dbcontext.SaveChanges();
            return true;
        }

        public async Task<FoodItem> AddMenuItemAsync(int restaurantId, FoodItem foodItem)
        {
            bool IsRestaurantExits = await _Dbcontext.Restaurants.AnyAsync(u => u.Id == restaurantId);
            if (!IsRestaurantExits)
            {
                throw new ArgumentException("Restaurant Not Exits");
            }
            bool IsmenuItemExits = await _Dbcontext.FoodItems.AnyAsync(u => u.Name == foodItem.Name && u.RestaurantId == restaurantId);
            if (IsmenuItemExits)
            {
                throw new ArgumentException($"{foodItem.Name}' is already exits");
            }
            try
            {
                _Dbcontext.Add(foodItem);
                await _Dbcontext.SaveChangesAsync();
                return foodItem;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to add MenuItem to database.", ex);
            }
        }

        public async Task<bool> UpdateMenuItembyIdAsync(int menuItemId, FoodItem foodItem)
        {
            FoodItem? existingMenuItem = await _Dbcontext.FoodItems.FindAsync(menuItemId);
            if (existingMenuItem == null)
            {
                return false;
            }
            try
            {
                existingMenuItem.Name = foodItem.Name;
                existingMenuItem.Description = foodItem.Description;
                existingMenuItem.CuisineType = foodItem.CuisineType;
                existingMenuItem.Price = foodItem.Price;
                if (!string.IsNullOrEmpty(foodItem.ImageUrl))
                {
                    existingMenuItem.ImageUrl = foodItem.ImageUrl;
                }
                existingMenuItem.CategoryId = foodItem.CategoryId;
                existingMenuItem.IsAvailable = foodItem.IsAvailable;
                await _Dbcontext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Update menu Item to database.", ex);
            }
        }

        public async Task<IEnumerable<FoodItem>> GetListOfMenuItemByRestaurantIdAsync(int resturentId)
        {
            try
            {
                return await _Dbcontext.FoodItems.Where(x => x.RestaurantId == resturentId).ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to fetch Restaurant Details from database.", ex);
            }
        }

        public async Task<CuisineAndCategoryListDto> GetCuisineAndCategoryList()
        {
            try
            {
                IEnumerable<Cuisine> cuisines = await _Dbcontext.Cuisines.ToListAsync();
                IEnumerable<Category> categories = await _Dbcontext.Categories.ToListAsync();
                if (cuisines.Any() && categories.Any())
                {
                   return  new CuisineAndCategoryListDto
                    {
                        Cuisines = cuisines,
                        Categories = categories
                    };
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to fetch Details from database.", ex);
            }
        }
        
    }
}
