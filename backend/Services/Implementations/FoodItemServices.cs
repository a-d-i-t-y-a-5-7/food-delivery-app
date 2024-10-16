using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services.Implementations
{
    public class FoodItemServices : IFoodItemServices
    {
        private readonly IFoodItemRepository _foodItemRepo;

        public FoodItemServices(IFoodItemRepository foodItemRepo)
        {
            _foodItemRepo = foodItemRepo;
        }

        public bool DeleteFoodItem(int id)
        {
            bool result = _foodItemRepo.DeleteFoodItem(id);
            return result;
        }
    }
}
