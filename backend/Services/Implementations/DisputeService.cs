using backend.DTOs;
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services.Implementations
{
    public class DisputeService:IDisputeService
    {
        private readonly IDisputeRepository _disputeRepository;

        public DisputeService(IDisputeRepository disputeRepository)
        {
            _disputeRepository = disputeRepository;
        }
        public async Task<Dispute> CreateDisputeAsync(AddDisputeDTOs disputeDto)
        {
            var dispute = new Dispute
            {
                OrderId = disputeDto.OrderId,
                Reason = disputeDto.Reason,
                Status = disputeDto.Status,
                TookCharge = disputeDto.TookCharge,
                Resolution = disputeDto.Resolution,
                CreatedAt = disputeDto.CreatedAt,
            };

            return await _disputeRepository.AddDisputeAsync(dispute);
        }

        public async Task<Dispute> UpdateDisputeAsync(int id, AddDisputeDTOs disputeDto)
        {
            var existingDispute = await _disputeRepository.GetDisputeByIdAsync(id);
            if (existingDispute == null)
            {
                throw new KeyNotFoundException("Dispute not found.");
            }

            existingDispute.OrderId = disputeDto.OrderId;
            existingDispute.Reason = disputeDto.Reason;
            existingDispute.Status = disputeDto.Status;
            existingDispute.TookCharge = disputeDto.TookCharge;
            existingDispute.Resolution = disputeDto.Resolution;
            existingDispute.CreatedAt = disputeDto.CreatedAt;

            return await _disputeRepository.UpdateDisputeAsync(existingDispute);
        }



    }
}

