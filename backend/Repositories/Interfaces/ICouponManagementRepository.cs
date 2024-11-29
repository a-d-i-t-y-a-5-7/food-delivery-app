using backend.DTOs;

namespace backend.Repositories.Interfaces
{
    public interface ICouponManagementRepository
    {
        Task<string> GenerateNewCouponCodeAsync(CouponDto couponDto);
        Task<GeneratedCouponsDto> GetListOfCouponCodeByRestaurantIdAsync( int id);
        Task<bool> UpdateCouponExpiryAsync(int id,DateTime dateTime);
    }
}
