using backend.DTOs;
using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IRestaurantRepositories
    {
        public List<Restaurant> GetRestaurants(int ownerId);
        public List<Order> GetOrders(int restaurantId);
        Task<RestaurantDto> AddRestaurantAsync(RestaurantDto restaurant);
    }
}
