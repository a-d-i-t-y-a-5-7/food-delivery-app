using backend.DTOs;
using backend.Repositories.Implementations;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services.Implementations
{
    public class CouponManagementService : ICouponManagementService
    {
        private readonly  ICouponManagementRepository _couponRepo;
        public CouponManagementService(ICouponManagementRepository couponManagementRepo)
        {
            _couponRepo = couponManagementRepo;
        }
        public async Task<string> GenerateNewCouponCode(CouponDto couponDto)
        {
           string newCouponCode = await _couponRepo.GenerateNewCouponCodeAsync(couponDto);
            return newCouponCode;
        }

        public async Task<GeneratedCouponsDto> GetCouponsCodeListByRestaurantId(int id)
        {
            GeneratedCouponsDto couponCodeList = await _couponRepo.GetListOfCouponCodeByRestaurantIdAsync(id);
            return couponCodeList;
        }

        public async Task<bool> UpdateCouponExpiry(int id, DateTime dateTime)
        {
            bool isCouponCodeExpiryUpdated = await _couponRepo.UpdateCouponExpiryAsync(id, dateTime);
            return isCouponCodeExpiryUpdated;
        }
    }
}
