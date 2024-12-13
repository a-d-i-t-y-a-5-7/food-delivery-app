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
                return BadRequest("Review is not provided.");
            }

            var createdReview = await _reviewService.AddReviews(review);
            return CreatedAtAction(nameof(AddReview), new { id = createdReview.Id }, createdReview);
        }

        [HttpGet("user/{customerId}")]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviewsByCustomerId(long customerId)
        {
            var reviews = await _reviewService.GetReviewsByCustomerId(customerId);
            if (reviews == null || reviews.Count == 0)
            {
                return NotFound("No reviews found for this customer.");
            }

            return Ok(reviews);
        }

        [HttpGet("restaurant/{restaurantId}/reviews")]
        public async Task<IActionResult> GetReviewsByRestaurantId(int restaurantId)
        {
            if (restaurantId <= 0)
            {
                return BadRequest("Invalid Restaurant ID.");
            }

            try
            {
                var reviews = await _reviewService.GetReviewsByRestaurantId(restaurantId);

                if (reviews == null || !reviews.Any())
                {
                    return NotFound("No reviews found for this restaurant.");
                }
                return Ok(reviews);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("delivery-partner/{deliveryPartnerId}/reviews")]
        public async Task<IActionResult> GetReviewsByDeliveryPartnerId(int deliveryPartnerId)
        {
            if (deliveryPartnerId <= 0)
            {
                return BadRequest("Invalid Delivery Partner ID.");
            }
            try
            {
                var reviews = await _reviewService.GetReviewsByDeliveryPartnerId(deliveryPartnerId);

                if (reviews == null || !reviews.Any())
                {
                    return NotFound("No reviews found for this delivery partner.");
                }
                return Ok(reviews);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("delivery-partner/{deliveryPartnerId}/avg-rating")]
        public async Task<IActionResult> GetAverageRatingByDeliveryPartnerId(int deliveryPartnerId)
        {
            if (deliveryPartnerId <= 0)
            {
                return BadRequest("Invalid Delivery Partner ID.");
            }

            var averageRating = await _reviewService.GetAverageRatingByDeliveryPartnerId(deliveryPartnerId);

            if (averageRating == null)
            {
                return NotFound("No reviews found for this delivery partner.");
            }

            return Ok(new { averageRating });
        }

        [HttpGet("restaurant/{restaurantId}/avg-rating")]
        public async Task<IActionResult> GetAverageRatingByRestaurantId(int restaurantId)
        {
            if (restaurantId <= 0)
            {
                return BadRequest("Invalid Restaurant ID.");
            }

            var averageRating = await _reviewService.GetAverageRatingByRestaurantId(restaurantId);

            if (averageRating == null)
            {
                return NotFound("No reviews found for this restaurant.");
            }

            return Ok(new { averageRating });
        }
    }

    }
