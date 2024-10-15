using backend.Models;

namespace backend.Services.Interfaces
{
    public interface IRestaurantServices
    {
        public List<Restaurant> GetRestaurants(int ownerId);
    }
}
