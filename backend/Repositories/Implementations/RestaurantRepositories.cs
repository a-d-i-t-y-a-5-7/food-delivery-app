using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.Implementations
{
    public class RestaurantRepositories : IRestaurantRepositories
    {
        private readonly FoodDeliveryDbContext _Dbcontext;

        public RestaurantRepositories(FoodDeliveryDbContext context)
        {
            _Dbcontext = context;
        }

        public List<Restaurant> GetRestaurants(int ownerId)
        {
            List<Restaurant>? restaurants = _Dbcontext.Restaurants.Where(r => r.OwnerId == ownerId).ToList();
            return restaurants;
        }

        public List<Order> GetOrders(int restaurantId)
        {
            List<Order>? orders = _Dbcontext.Orders.Where(o => o.RestaurantId == restaurantId).ToList();
            return orders;
        }
        public async Task<Restaurant> AddRestaurantAsync(Restaurant restaurant)
        {
            bool IsPhonenoExits = await _Dbcontext.Restaurants.AnyAsync(u => u.PhoneNumber == restaurant.PhoneNumber);
            if (IsPhonenoExits)
            {
                throw new ArgumentException($"{restaurant.PhoneNumber}' is already exits");
            }
            try
            {
                _Dbcontext.Add(restaurant);
                await _Dbcontext.SaveChangesAsync();
                return restaurant;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to add Restaurant to database.", ex);
            }

        }

        public Restaurant? GetRestaurantById(int restaurantId)
        {
            return _Dbcontext.Restaurants.FirstOrDefault(r => r.Id == restaurantId);
        }

        public void Save()
        {
            _Dbcontext.SaveChanges();
        }

        public void DeleteRestaurant(Restaurant restaurant)
        {
            _Dbcontext.Restaurants.Remove(restaurant);
            Save();
        }

    }
}
