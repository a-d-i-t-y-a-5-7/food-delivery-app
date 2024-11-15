using backend.DTOs;
using backend.Models;

namespace backend.Services.Interfaces
{
    public interface IDeliveryPartnerServices
    {
        public bool AddDeliveryPartner(User deliveryPartner);
        public DeliveryPartnerOrderDetailsDto? GetOrdersByDeliveryPartner(int deliveryPartnerId);
        public bool ToggleIsActiveStatus(int id);
    }
}
