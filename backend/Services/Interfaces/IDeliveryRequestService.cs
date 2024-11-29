using backend.DTOs;
using backend.Models;

namespace backend.Services.Interfaces
{
    public interface IDeliveryRequestService
    {
        public void AddDeliveryRequest(DeliveryRequestDto deliveryRequestDto);
        public void DeleteDeliveryRequest(int id);
        int GetTotalDeliveryIncentive(int deliveryPartnerId);
        double GetAverageRatingForDeliveryPartner(int deliveryPartnerId);

    }
}
