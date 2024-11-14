using backend.DTOs;
using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IReviewRepository
    {
        Task<Review?> AddReview(Review review);
        Task<decimal?> GetRatingByRestaurant(int restaurantId);
    }
}
