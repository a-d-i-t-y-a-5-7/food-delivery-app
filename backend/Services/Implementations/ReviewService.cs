using backend.DTOs;
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services.Implementations
{
    public class ReviewService:IReviewService
    {
        private readonly IReviewRepository _reviewRepository;

        public ReviewService(IReviewRepository reviewRepository)
        {
            _reviewRepository = reviewRepository;
        }

        public async Task<Review?> AddReviews(AddReviewDto reviewDto)
        {
            var review = new Review
            {
                OrderId = reviewDto.OrderId,
                Rating = reviewDto.Rating,
                Comment = reviewDto.Comment,
                ReviewType = reviewDto.ReviewType,
                CreatedAt = DateTime.UtcNow
            };
            return await _reviewRepository.AddReview(review);
        }
        public async Task<decimal?> GetRestaurantRating(int restaurantId)
        {
            return await _reviewRepository.GetRatingByRestaurant(restaurantId);
        }
    }
}
