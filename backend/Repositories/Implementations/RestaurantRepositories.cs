using backend.Models;
using backend.Repositories.Interfaces;

namespace backend.Repositories.Implementations
{
    public class RestaurantRepositories : IRestaurantRepositories
    {
        private readonly FoodDeliveryDbContext _context;

        public RestaurantRepositories(FoodDeliveryDbContext context)
        {
            _context = context;
        }

        public List<Restaurant> GetRestaurants(int ownerId)
        {
            List<Restaurant>? restaurants = _context.Restaurants.Where(r => r.OwnerId == ownerId).ToList();
            return restaurants;
        }
    }
}
