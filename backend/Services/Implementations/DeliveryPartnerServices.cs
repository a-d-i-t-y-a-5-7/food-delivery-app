using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services.Implementations
{
    public class DeliveryPartnerServices : IDeliveryPartnerServices
    {
        private readonly IDeliveryPartnerRepository _userRepo;

        public DeliveryPartnerServices(IDeliveryPartnerRepository userRepo)
        {
            _userRepo = userRepo;
        }

        public bool AddDeliveryPartner(User deliveryPartner)
        {
            bool result = _userRepo.AddDeliveryPartner(deliveryPartner);
            return result;
        }
    }
}
