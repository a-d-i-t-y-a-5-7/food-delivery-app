using backend.Models;
using backend.Repositories.Interfaces;

namespace backend.Repositories.Implementations
{
    public class FoodItemRepository : IFoodItemRepository
    {
        private readonly FoodDeliveryDbContext _context;

        public FoodItemRepository(FoodDeliveryDbContext context)
        {
            _context = context;
        }

        public bool DeleteFoodItem(int id)
        {
            FoodItem? item = _context.FoodItems.Find(id);

            if(item == null)
            {
                return false;
            }

            _context.FoodItems.Remove(item);
            _context.SaveChanges();
            return true;
        }
    }
}
