using backend.DTOs;
using backend.Models;

namespace backend.Services.Interfaces
{
    public interface IReviewService
    {
        Task<Review?> AddReviews(AddReviewDto review);
        Task<decimal?> GetRestaurantRating(int restaurantId);
    }
}
