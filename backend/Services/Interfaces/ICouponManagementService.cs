using backend.DTOs;

namespace backend.Services.Interfaces
{
    public interface ICouponManagementService
    {
        Task<string> GenerateNewCouponCode(CouponDto couponDto);

        Task<GeneratedCouponsDto> GetCouponsCodeListByRestaurantId(int id);
        Task<bool> UpdateCouponExpiry(int id, DateTime dateTime);
    }
}
