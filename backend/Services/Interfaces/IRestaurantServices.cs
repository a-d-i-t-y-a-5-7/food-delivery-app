using backend.Models;

namespace backend.Services.Interfaces
{
    public interface IRestaurantServices
    {
        public List<Restaurant> GetRestaurants(int ownerId);
        public List<Restaurant> GetAllRestaurants();
        public List<Order> GetOrders(int restaurantId);
        Task<Restaurant> AddRestaurantAsync(Restaurant restaurant);

    }
}
