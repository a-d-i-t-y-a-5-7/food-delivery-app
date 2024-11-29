using backend.DTOs;
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
        public List<RestaurantDto> GetAllRestaurants()
        {

            return _restaurantRepo.GetAllRestaurants();
        }

        public List<Restaurant> GetRestaurants(int ownerId)
        {
            List<Restaurant> restaurants = _restaurantRepo.GetRestaurants(ownerId);

            return restaurants;
        }

        public List<OrdersDto> GetOrders(int restaurantId)
        {
            List<OrdersDto> orders = _restaurantRepo.GetOrders(restaurantId);
            return orders;
        }
        public async Task<bool> AddRestaurant(RestaurantsDto restaurant, IFormFile formFile)
        {
            bool newRestaurant = await _restaurantRepo.AddRestaurantAsync(restaurant,formFile);
            return newRestaurant;
        }

        public bool UpdateRestaurantApprovalStatus(int restaurantId, bool status)
        {
            var restaurant = _restaurantRepo.GetRestaurantById(restaurantId);

            if (restaurant == null)
                return false;
            if (restaurant.IsApproved == false)
            {
                if (status)
                {
                    restaurant.IsApproved = true;
                    _restaurantRepo.Save();
                }
                else
                {
                    _restaurantRepo.DeleteRestaurant(restaurant);
                }
            }
            else
            {
                return false;
            }


            return true;
        }
    }
}
