using backend.DTOs;
using backend.Models;

namespace backend.Services.Interfaces
{
    public interface IRestaurantServices
    {
        public List<Restaurant> GetRestaurants(int ownerId);
        public List<RestaurantDto> GetAllRestaurants();
        public List<OrdersDto> GetOrders(int restaurantId);
        Task<bool> AddRestaurant(RestaurantsDto restaurant,IFormFile formFile);
        bool UpdateRestaurantApprovalStatus(int restaurantId, bool status);

    }
}
