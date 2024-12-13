using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services.Interfaces
{
    public interface IReviewService
    {
        Task<Review?> AddReviews(AddReviewDto review);
        Task<List<Review>> GetReviewsByCustomerId(long customerId);
        Task<List<Review>> GetReviewsByRestaurantId(int restaurantId);
        Task<List<Review>> GetReviewsByDeliveryPartnerId(int deliveryPartnerId);
        Task<double?> GetAverageRatingByDeliveryPartnerId(int deliveryPartnerId);
        Task<double?> GetAverageRatingByRestaurantId(int restaurantId);
    }
}
