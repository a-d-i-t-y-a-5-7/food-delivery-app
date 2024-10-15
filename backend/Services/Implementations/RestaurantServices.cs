using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services.Implementations
{
    public class RestaurantServices : IRestaurantServices
    {
        private readonly IRestaurantRepositories _restaurantRepo;

        public RestaurantServices(IRestaurantRepositories restaurantRepo)
        {
            _restaurantRepo = restaurantRepo;
        }

        public List<Restaurant> GetRestaurants(int ownerId)
        {
            List<Restaurant> restaurants = _restaurantRepo.GetRestaurants(ownerId);

            return restaurants;
        }
    }
}
