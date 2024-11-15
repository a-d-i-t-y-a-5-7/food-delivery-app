using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IDeliveryPartnerRepository
    {
        public bool AddDeliveryPartner(User deliveryPartner);

        public DeliveryPartner? GetDeliveryPartnerWithOrders(int deliveryPartnerId);
        DeliveryPartner GetDeliveryPartnerById(int id);
        void UpdateDeliveryPartner(DeliveryPartner deliveryPartner);
        void Save();
    }
}
