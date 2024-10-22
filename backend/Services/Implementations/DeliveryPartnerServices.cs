using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services.Implementations
{
    public class DeliveryPartnerServices : IDeliveryPartnerServices
    {
        private readonly IDeliveryPartnerRepository _deliveryPartnerRepo;

        public DeliveryPartnerServices(IDeliveryPartnerRepository deliveryPartnerRepo)
        {
            _deliveryPartnerRepo = deliveryPartnerRepo;
        }

        public bool AddDeliveryPartner(User deliveryPartner)
        {
            bool result = _deliveryPartnerRepo.AddDeliveryPartner(deliveryPartner);
            return result;
        }
    }
}
