using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IDeliveryRequestRepository
    {
        void AddDeliveryRequest(DeliveryRequest deliveryRequest);
        public void DeleteDeliveryRequest(int id);
        public int GetTotalDeliveryIncentiveByPartnerId(int deliveryPartnerId);
        List<int> GetOrderIdsByDeliveryPartnerId(int deliveryPartnerId);
        void Save();
    }
}
