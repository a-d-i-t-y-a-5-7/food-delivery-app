using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IDeliveryPartnerRepository
    {
        public bool AddDeliveryPartner(User deliveryPartner);
    }
}
