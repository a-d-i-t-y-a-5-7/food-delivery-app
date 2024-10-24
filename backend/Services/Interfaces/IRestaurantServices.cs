using backend.Models;

namespace backend.Services.Interfaces
{
    public interface IRestaurantServices
    {
        public List<Restaurant> GetRestaurants(int ownerId);
        public List<Order> GetOrders(int restaurantId);
        Task<Restaurant> AddRestaurantAsync(Restaurant restaurant);
        bool UpdateRestaurantApprovalStatus(int restaurantId, bool status);

    }
}
