using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.Implementations
{
    public class DeliveryPartnerRepository : IDeliveryPartnerRepository
    {
        private readonly FoodDeliveryDbContext _context;

        public DeliveryPartnerRepository(FoodDeliveryDbContext context)
        {
            _context = context;
        }

        public bool AddDeliveryPartner(User deliveryPartner)
        {
            User? user = _context.Users.FirstOrDefault(u => u.Email ==  deliveryPartner.Email);

            if (user == null)
            {
                _context.Users.Add(deliveryPartner);
                _context.SaveChanges();

                DeliveryPartner newDeliveryPartner = new DeliveryPartner
                {
                    PartnerId = deliveryPartner.Id,
                    ComplaintCount = 0,
                    Penalty = 0,
                    IsActive = true,
                    DeliveryPhoneNumber = null,
                    CreatedAt = DateTime.Now
                };

                _context.DeliveryPartners.Add(newDeliveryPartner);
                _context.SaveChanges();
                return true;
            }

            return false;
        }

        public DeliveryPartner? GetDeliveryPartnerWithOrders(int deliveryPartnerId)
        {
            return _context.DeliveryPartners
                .Include(dp => dp.Orders)
                    .ThenInclude(o => o.Restaurant)
                .Include(dp => dp.Orders)
                    .ThenInclude(o => o.DeliveryRequests)
                .Include(dp => dp.Orders)
                    .ThenInclude(o => o.Customer)
                .FirstOrDefault(dp => dp.Id == deliveryPartnerId);
        }
    }
}
