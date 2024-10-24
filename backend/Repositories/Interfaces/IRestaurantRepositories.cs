using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IRestaurantRepositories
    {
        public List<Restaurant> GetRestaurants(int ownerId);
        public List<Order> GetOrders(int restaurantId);
        Task<Restaurant> AddRestaurantAsync(Restaurant restaurant);

        public Restaurant? GetRestaurantById(int restaurantId);
        void DeleteRestaurant(Restaurant restaurant);

        public void Save();
    }
}
