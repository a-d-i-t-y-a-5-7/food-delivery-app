using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Repositories.Interfaces
{
    public interface IReviewRepository
    {
        Task<Review?> AddReview(Review review);
        Task<List<Review>> GetReviewsByCustomerId(long customerId);
        List<int?> GetRatingsByOrderIdsAndType(List<int> orderIds, string reviewType);
        Task<List<Review>> GetReviewsByRestaurantId(int restaurantId);
        Task<List<Review>> GetReviewsByDeliveryPartnerId(int deliveryPartnerId);
        Task<double?> GetavgRatingByDeliveryId(int deliveryPartnerId);
        Task<double?> GetavgRatingByRestaurantId(int restaurantId);
    }
}
