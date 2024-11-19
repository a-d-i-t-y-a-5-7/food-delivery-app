using backend.DTOs;
using backend.Models;
using backend.Repositories.Implementations;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services.Implementations
{
    public class DeliveryRequestService : IDeliveryRequestService
    {
        private readonly IDeliveryRequestRepository _deliveryRequestRepository;
        private readonly IReviewRepository _reviewRepository;

        public DeliveryRequestService(IDeliveryRequestRepository deliveryRequestRepository, IReviewRepository reviewRepository)
        {
            _deliveryRequestRepository = deliveryRequestRepository;
            _reviewRepository = reviewRepository;
        }

        public void AddDeliveryRequest(DeliveryRequestDto deliveryRequestDto)
        {
            var deliveryRequest = new DeliveryRequest
            {
                DeliveryPartnerId = deliveryRequestDto.DeliveryPartnerId,
                OrderId = deliveryRequestDto.OrderId,
                DeliveryInsentive = deliveryRequestDto.DeliveryIncentive,
                CreatedAt = DateTime.Now
            };

            _deliveryRequestRepository.AddDeliveryRequest(deliveryRequest);
            _deliveryRequestRepository.Save();
        }

        public void DeleteDeliveryRequest(int id)
        {
            _deliveryRequestRepository.DeleteDeliveryRequest(id);
            _deliveryRequestRepository.Save();
        }

        public int GetTotalDeliveryIncentive(int deliveryPartnerId)
        {
            return _deliveryRequestRepository.GetTotalDeliveryIncentiveByPartnerId(deliveryPartnerId);
        }

        public double GetAverageRatingForDeliveryPartner(int deliveryPartnerId)
        {
            var orderIds = _deliveryRequestRepository.GetOrderIdsByDeliveryPartnerId(deliveryPartnerId);

            var ratings = _reviewRepository.GetRatingsByOrderIdsAndType(orderIds, "DeliveryPartner");

            return ratings.Any() ? ratings.Average(r => r.GetValueOrDefault()) : 0.0;
        }
    }
}
