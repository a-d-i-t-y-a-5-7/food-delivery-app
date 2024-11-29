using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IDisputeRepository
    {
        Task<Dispute> AddDisputeAsync(Dispute dispute);
        Task<Dispute> UpdateDisputeAsync(Dispute dispute);

        Task<Dispute?> GetDisputeByIdAsync(int id);

    }
}
