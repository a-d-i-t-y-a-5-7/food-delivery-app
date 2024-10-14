using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IRestaurantRepositories
    {
        public List<Restaurant> GetRestaurants(int ownerId);
    }
}
