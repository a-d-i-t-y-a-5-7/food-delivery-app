using backend.DTOs;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.Implementations
{
    public class RestaurantRepositories : IRestaurantRepositories
    {
        private readonly FoodDeliveryDbContext _Dbcontext;

        public RestaurantRepositories(FoodDeliveryDbContext context)
        {
            _Dbcontext = context;
        }

        public List<Restaurant> GetRestaurants(int ownerId)
        {
            List<Restaurant>? restaurants = _Dbcontext.Restaurants.Where(r => r.OwnerId == ownerId).ToList();
            return restaurants;
        }

        public List<Order> GetOrders(int restaurantId)
        {
            List<Order>? orders = _Dbcontext.Orders.Where(o => o.RestaurantId == restaurantId).ToList();
            return orders;
        }
        public async Task<RestaurantDto> AddRestaurantAsync(RestaurantDto restaurantDto)
        {
            bool IsPhonenoExits = await _Dbcontext.Restaurants.AnyAsync(u => u.PhoneNumber == restaurantDto.PhoneNumber);
            if (IsPhonenoExits)
            {
                throw new ArgumentException($"{restaurantDto.PhoneNumber}' is already exits");
            }
            try
            {
                Address address = new Address
                {
                    EntityId = restaurantDto.OwnerId,
                    EntityType = "Restaurant",
                    AddressLine1 = restaurantDto.StreetAddress,
                    AddressLine2 = restaurantDto.AdditionalAddress,
                    City = restaurantDto.City,
                    State = restaurantDto.State,
                    ZipCode = restaurantDto.Pincode,
                    Country = "INDIA"
                };
                Restaurant newrestaurant = new Restaurant {
                    OwnerId = restaurantDto.OwnerId,
                    Name = restaurantDto.Name,
                    PhoneNumber = restaurantDto.PhoneNumber,
                    OpeningTime = restaurantDto.OpeningTime,
                    ClosingTime = restaurantDto.ClosingTime
                };

                _Dbcontext.Add(address);
                _Dbcontext.Add(newrestaurant);
                await _Dbcontext.SaveChangesAsync();
                return restaurantDto;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to add Restaurant to database.", ex);
            }

        }

    }
}
