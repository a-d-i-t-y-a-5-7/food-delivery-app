using backend.Models;
using backend.Repositories.Interfaces;

namespace backend.Repositories.Implementations
{
    public class DisputeRepository : IDisputeRepository
    {
        private readonly FoodDeliveryDbContext _context;

        public DisputeRepository(FoodDeliveryDbContext context)
        {
            _context = context;
        }

        public async Task<Dispute> AddDisputeAsync(Dispute dispute)
        {
            await _context.Disputes.AddAsync(dispute);
            await _context.SaveChangesAsync();
            return dispute;
        }

        public async Task<Dispute> UpdateDisputeAsync(Dispute dispute)
        {
            _context.Disputes.Update(dispute);
            await _context.SaveChangesAsync();
            return dispute;
        }

        public async Task<Dispute?> GetDisputeByIdAsync(int id)
        {
            return await _context.Disputes.FindAsync(id);
        }



    }
}

