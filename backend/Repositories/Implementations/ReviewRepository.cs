using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.Implementations
{
    public class ReviewRepository:IReviewRepository
    {
        private readonly FoodDeliveryDbContext _context;

        public ReviewRepository(FoodDeliveryDbContext context)
        {
            _context = context;
        }

        public async Task<Review> AddReview(Review review)
        {
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();
            return review;
        }
        public async Task<decimal?> GetRatingByRestaurant(int restaurantId)
        {
            return await _context.Restaurants.Where(r => r.Id == restaurantId && r.Rating.HasValue)
                .AverageAsync(r => r.Rating);
        }

        public List<int?> GetRatingsByOrderIdsAndType(List<int> orderIds, string reviewType)
        {
            return _context.Reviews
                .Where(r => orderIds.Contains(r.OrderId.Value) && r.ReviewType == reviewType)
                .Select(r => r.Rating)
                .ToList();
        }
    }
}
