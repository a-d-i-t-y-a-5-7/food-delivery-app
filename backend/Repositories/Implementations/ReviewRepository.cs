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

        public async Task<List<Review>> GetReviewsByRestaurantId(int restaurantId)
        {
            return await _context.Reviews
        .Where(r => r.Order.RestaurantId == restaurantId && r.ReviewType == "Restaurant")
        .ToListAsync();
        }

        public async Task<List<Review>> GetReviewsByDeliveryPartnerId(int deliveryPartnerId)
        {
            return await _context.Reviews
                .Where(r => r.Order.DeliveryPartnerId == deliveryPartnerId && r.ReviewType == "DeliveryPartner")
                .ToListAsync();
        }

        public List<int?> GetRatingsByOrderIdsAndType(List<int> orderIds, string reviewType)
        {
            return _context.Reviews
                .Where(r => orderIds.Contains(r.OrderId.Value) && r.ReviewType == reviewType)
                .Select(r => r.Rating)
                .ToList();
        }

        public async Task<double?> GetavgRatingByDeliveryId(int deliveryPartnerId)
        {
            var reviews = await _context.Reviews
       .Where(r => r.Order.DeliveryPartnerId == deliveryPartnerId && r.ReviewType == "DeliveryPartner")
       .ToListAsync();

            return reviews.Average(r => r.Rating);
        }

        public async Task<double?> GetavgRatingByRestaurantId(int restaurantId)
        {
           var reviews = await _context.Reviews
        .Where(r => r.Order.RestaurantId == restaurantId && r.ReviewType == "Restaurant")
        .ToListAsync();

            return reviews.Average(r => r.Rating);
        }


    }
}
