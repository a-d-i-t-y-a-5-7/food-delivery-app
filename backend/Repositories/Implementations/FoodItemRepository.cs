using backend.Controllers;
using backend.DTOs;
using backend.Helper;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System.Collections.Immutable;
using static System.Net.Mime.MediaTypeNames;

namespace backend.Repositories.Implementations
{
    public class FoodItemRepository : IFoodItemRepository
    {
        private readonly FoodDeliveryDbContext _Dbcontext;

        public FoodItemRepository(FoodDeliveryDbContext context)
        {
            _Dbcontext = context;
        }
        public FoodItem GetFoodItemById(int id)
        {
            var item = _Dbcontext.FoodItems
                .FirstOrDefault(o => o.Id == id);

            if (item == null)
                return null;

            return new FoodItem
            {
                Id = item.Id,
                Name = item.Name,
                RestaurantId = item.RestaurantId,
                Description = item.Description,
                ImageUrl = item.ImageUrl,
                Price = item.Price,
                CategoryId = item.CategoryId,
                CuisineTypeId = item.CuisineTypeId,
                IsAvailable = item.IsAvailable,
                Quantity = item.Quantity,  
            };
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

        public async Task<bool> AddMenuItemAsync(FoodItem foodItem, IFormFile image)
        {
            bool IsRestaurantExits = await _Dbcontext.Users.AnyAsync(u => u.Id == foodItem.RestaurantId);
            if (!IsRestaurantExits)
            {
                throw new ArgumentException("Restaurant Not Exits");
            }
            bool IsmenuItemExits = await _Dbcontext.FoodItems.AnyAsync(u => u.Name == foodItem.Name && u.RestaurantId == foodItem.RestaurantId);
            if (IsmenuItemExits)
            {
                throw new ArgumentException($"{foodItem.Name} is already exits");
            }
            if (image != null && image.Length > 0)
            {
                HelperClass helper = new HelperClass();
                string? imageUrl = await helper.UploadImageAsync(image);
                if (imageUrl != null)
                {
                    foodItem.ImageUrl = imageUrl;
                }
            }
            try
            {
                await _Dbcontext.AddAsync(foodItem);
                await _Dbcontext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to add MenuItem to database.", ex);
            }
        }

        public async Task<bool> UpdateMenuItembyIdAsync(int menuItemId, FoodItem foodItem, IFormFile image)
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
                if (image != null && image.Length > 0)
                {
                    HelperClass helper = new HelperClass();
                    string? imageUrl = await helper.UploadImageAsync(image);
                    if (imageUrl != null)
                    {
                        existingMenuItem.ImageUrl = imageUrl;
                    }
                }
                existingMenuItem.CategoryId = foodItem.CategoryId;
                existingMenuItem.IsAvailable = foodItem.IsAvailable;
                 _Dbcontext.Update(existingMenuItem);
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
                var cuisinesDto = cuisines.Select(c => new CusinesDto
                {
                    Id = c.Id,
                    CuisineName = c.CuisineName
                }).ToList();
                var categoriesDto = categories.Select(c => new CategoriesDto
                {
                    Id = c.Id,
                    CategoryName = c.CategoryName
                }).ToList();
                var result = new CuisineAndCategoryListDto
                {
                    Cuisines = cuisinesDto,
                    Categories = categoriesDto
                };
                if (cuisines.Any() && categories.Any())
                {
                    return result;
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to fetch Details from database.", ex);
            }
        }

        public async Task<FoodItem?> GetMenuItemByIdAsync(int menuItemId)
        {
            try
            {
                return await _Dbcontext.FoodItems.FindAsync(menuItemId);
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to fetch menuItem from Database.", ex);
            }
        }
        public async Task UpdateMenuItem(FoodItem foodItem)
        {
            _Dbcontext.Update(foodItem);
            await _Dbcontext.SaveChangesAsync();
        }

        public async Task<bool> UpdateMenuItemPriceAsync(int menuItemId, FoodItemPriceDto foodItemPriceDto)
        {
            try
            {
                FoodItem? existingfoodItem = await _Dbcontext.FoodItems.FindAsync(menuItemId);
                if (existingfoodItem != null)
                {
                    existingfoodItem.Price = foodItemPriceDto.Price;
                    _Dbcontext.Update(existingfoodItem);
                    await _Dbcontext.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Update menu Item price in Database.", ex);
            }
        }

        public async Task<bool> AddCategoryAsync(string categoryName)
        {

            bool isCategoryNameExits = _Dbcontext.Categories.Any(x => x.CategoryName.ToLower() == categoryName.ToLower());
            if (isCategoryNameExits)
            {
                throw new ArgumentException($"{categoryName}' is already exits");
            }
            try
            {
                Category category = new Category
                {
                    CategoryName = categoryName,
                };
                await _Dbcontext.AddAsync(category);
                await _Dbcontext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Update menu Item price in Database.", ex);
            }
        }

        public async Task<IEnumerable<CategoryDto>> GetAllCategoryAsync()
        {
            List<Category> categoriesList = await _Dbcontext.Categories.ToListAsync();
            List<CategoryDto> categoriesdtoList = new List<CategoryDto>();
            if (categoriesList.Any())
            {
                for (int i = 0; i < categoriesList.Count; i++)
                {
                    CategoryDto categoryDto = new CategoryDto
                    {
                        Id = categoriesList[i].Id,
                        CategoryName = categoriesList[i].CategoryName
                    };
                    categoriesdtoList.Add(categoryDto);
                }
            }
            return categoriesdtoList;
        }
    }
}
