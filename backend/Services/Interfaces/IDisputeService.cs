using backend.DTOs;
using backend.Models;

namespace backend.Services.Interfaces
{
    public interface IDisputeService
    {
        Task<Dispute> CreateDisputeAsync(AddDisputeDTOs disputeDto);
        Task<Dispute> UpdateDisputeAsync(int id, AddDisputeDTOs disputeDto);



    }
}
