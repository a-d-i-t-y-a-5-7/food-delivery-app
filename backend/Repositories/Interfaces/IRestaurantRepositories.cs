using backend.DTOs;
using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IRestaurantRepositories
    {
        public List<Restaurant> GetRestaurants(int ownerId);
        public List<RestaurantDto> GetAllRestaurants();
        public List<OrdersDto> GetOrders(int restaurantId);
        Task<bool> AddRestaurantAsync(RestaurantsDto restaurant, IFormFile formFile);
        public Restaurant? GetRestaurantById(int restaurantId);
        void DeleteRestaurant(Restaurant restaurant);
        public void Save();
        public bool UpdateRestaurant(string token, RestaurantDto restaurant);
        public bool UpdateActiveStatus(string token, int restaurantId);
    
    }
}
