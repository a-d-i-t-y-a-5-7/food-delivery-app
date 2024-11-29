using backend.DTOs;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.Implementations
{
    public class CouponManagementRepository : ICouponManagementRepository
    {
        private readonly FoodDeliveryDbContext _Dbcontext;
        public CouponManagementRepository(FoodDeliveryDbContext DbContext)
        {
            _Dbcontext = DbContext;
        }
        public async Task<string> GenerateNewCouponCodeAsync(CouponDto couponDto)
        {
            try
            {
             string couponCode = GenerateRandomCouponCode(couponDto.DiscountPercentage);
                Coupon coupon = new Coupon
                {
                    Code = couponCode,
                    DiscountPercentage = couponDto.DiscountPercentage,
                    RestaurantId = couponDto.RestaurantId,
                    Expiry = couponDto.Expiry,
                    IsActive = couponDto.IsActive

                };

                _Dbcontext.Coupons.Add(coupon);
                await _Dbcontext.SaveChangesAsync();
                return couponCode;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Generate New Coupon Code.", ex);
            }
        }

        public async Task<GeneratedCouponsDto> GetListOfCouponCodeByRestaurantIdAsync(int id)
        {
            List<Coupon> couponList = await _Dbcontext.Coupons.Where(x => x.RestaurantId == id).ToListAsync();
            if (!couponList.Any())
            {
                return null;
            }
            try
            {
                GeneratedCouponsDto couponCodeListDto = new GeneratedCouponsDto
                {
                    CouponCode = couponList.Select(coupon => coupon.Code).ToList()
                };
                return couponCodeListDto;

            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Get Coupon Codes List.", ex);
            }
           
        }

        public async Task<bool> UpdateCouponExpiryAsync(int id ,DateTime dateTime)
        {
            Coupon? isCouponCodeExits = await _Dbcontext.Coupons.FindAsync(id);
            if (isCouponCodeExits == null) {
                return false;
            }
            if (dateTime <= isCouponCodeExits.Expiry)
            {
                throw  new ArgumentException("Expiry date should be greater that existing" );
            }
            isCouponCodeExits.Expiry = dateTime;
            try
            {
                _Dbcontext.Update(isCouponCodeExits);
                await _Dbcontext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Update Coupon Codes Expiry Date.", ex);
            }
             

        }
        private string GenerateRandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            Random random = new Random();
            char[] stringChars = new char[length];

            for (int i = 0; i < length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }

            return new string(stringChars);
        }
        public string GenerateRandomCouponCode(decimal discountPercentage)
        {
            if (discountPercentage <= 0 || discountPercentage > 100)
            {
                throw new ArgumentException("Discount percentage must be between 1 and 100.");
            }
            string randomString = GenerateRandomString(8);
            string couponCode = $"DISCOUNT{discountPercentage}_{randomString}";
            return couponCode;
        }
    }
}
