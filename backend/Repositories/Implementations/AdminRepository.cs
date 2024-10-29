using backend.Models;
using backend.Repositories.Interfaces;
using System;

namespace backend.Repositories.Implementations
{
    public class AdminRepository : IAdminRepository
    {
        private readonly FoodDeliveryDbContext _context;

        public AdminRepository(FoodDeliveryDbContext context)
        {
            _context = context;
        }

        public Admin? GetAdminById(int adminId)
        {
            return _context.Admins.FirstOrDefault(a => a.Id == adminId);
        }
    }
}
