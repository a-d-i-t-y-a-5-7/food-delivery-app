using backend.DTOs;
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<List<Review>> GetReviewsByCustomerId(long customerId)
        {
            return await _reviewRepository.GetReviewsByCustomerId(customerId);
        }

        public async Task<List<Review>> GetReviewsByRestaurantId(int restaurantId)
        {
            return await _reviewRepository.GetReviewsByRestaurantId(restaurantId);
        }

        public async Task<List<Review>> GetReviewsByDeliveryPartnerId(int deliveryPartnerId)
        {
            return await _reviewRepository.GetReviewsByDeliveryPartnerId(deliveryPartnerId);
        }

        public async Task<double?> GetAverageRatingByDeliveryPartnerId(int deliveryPartnerId)
        {
            return await _reviewRepository.GetavgRatingByDeliveryId(deliveryPartnerId);
        }

        public async Task<double?> GetAverageRatingByRestaurantId(int restaurantId)
        {
            return await _reviewRepository.GetavgRatingByRestaurantId(restaurantId);
        }
    }
}
