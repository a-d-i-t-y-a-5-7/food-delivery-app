using backend.DTOs;
using backend.Models;
using backend.Services.Implementations;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewService _reviewService;
        private readonly IDeliveryRequestService _deliveryRequestService;
        

        public ReviewController(IReviewService reviewService, IDeliveryRequestService deliveryRequestService)
        {
            _reviewService = reviewService;
            _deliveryRequestService = deliveryRequestService;
        }

        [HttpPost]
        public async Task<IActionResult> AddReview([FromBody] AddReviewDto review)
        {
            if (review == null)
            {
                return BadRequest("Review is null.");
            }

            var createdReview = await _reviewService.AddReviews(review);
            return CreatedAtAction(nameof(AddReview), new { id = createdReview.Id }, createdReview);
        }

        [HttpGet("restaurantRating/{restaurantId}")]
        public async Task<IActionResult> GetRestaurantRating(int restaurantId)
        {
            if(restaurantId == 0 || restaurantId==null) { return BadRequest(); }

            var restaurantRating = await _reviewService.GetRestaurantRating(restaurantId);

            if (restaurantRating == null)
            {
                return NotFound($"No ratings found for restuarant with ID {restaurantId}");
            }
            return Ok(new { restaurantId = restaurantId, restaurantRating= restaurantRating });
        }

        [HttpGet("{deliveryPartnerId}/average-rating")]
        public IActionResult GetAverageRatingForDeliveryPartner(int deliveryPartnerId)
        {
            var averageRating = _deliveryRequestService.GetAverageRatingForDeliveryPartner(deliveryPartnerId);

            return Ok(new { DeliveryPartnerId = deliveryPartnerId, AverageRating = averageRating });
        }
    }
}
