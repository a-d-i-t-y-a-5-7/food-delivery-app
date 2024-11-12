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
        public List<RestaurantDto> GetAllRestaurants()
        {
            
            var restaurants = _Dbcontext.Restaurants.ToList();
            var cuisines = _Dbcontext.Cuisines.ToList();
            var restaurantCuisines = _Dbcontext.RestaurantCuisines.ToList();
            var restaurantDtos = restaurants.Select(r => new RestaurantDto
            {
                Id = r.Id,
                OwnerId = r.OwnerId,
                Name = r.Name,
                PhoneNumber = r.PhoneNumber,
                Rating = r.Rating,
                OpeningTime = r.OpeningTime,
                ClosingTime = r.ClosingTime,
                IsApproved = r.IsApproved,
                IsActive= r.IsActive,
                image_url = r.ImageUrl,
                Cuisine = restaurantCuisines
                    .Where(rc => rc.RestaurantId == r.Id)
                    .Select(rc => cuisines.FirstOrDefault(c => c.Id == rc.CuisineId)?.CuisineName)
                    .Where(cuisineName => cuisineName != null) 
                    .ToList()
            }).ToList();

            return restaurantDtos;
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
        public async Task<RestaurantsDto> AddRestaurantAsync(RestaurantsDto restaurantDto)
        {

            bool IsPhonenoExits = await _Dbcontext.Restaurants.AnyAsync(u => u.PhoneNumber == restaurantDto.PhoneNumber);
            if (IsPhonenoExits)
            {
                throw new ArgumentException($"{restaurantDto.PhoneNumber}' is already exits");
            }
            bool IsRestaurantNameExits = await _Dbcontext.Restaurants.AnyAsync(u => u.Name == restaurantDto.Name && u.OwnerId == restaurantDto.OwnerId);
            if (IsRestaurantNameExits)
            {
                throw new ArgumentException($"{restaurantDto.Name}' is already exits");
            }
            try
            {
                Address address = new Address
                {
                    EntityId = restaurantDto.OwnerId,
                    EntityType = "RESTAURANT",
                    AddressLine1 = restaurantDto.StreetAddress,
                    AddressLine2 = restaurantDto.AdditionalAddress,
                    City = restaurantDto.City,
                    State = restaurantDto.State,
                    ZipCode = restaurantDto.Pincode,
                    Country = "INDIA"
                };
                Restaurant newrestaurant = new Restaurant
                {
                    OwnerId = restaurantDto.OwnerId,    
                    Name = restaurantDto.Name,
                    PhoneNumber = restaurantDto.PhoneNumber,
                    OpeningTime = restaurantDto.OpeningTime,
                    ClosingTime = restaurantDto.ClosingTime,
                    ImageUrl = restaurantDto.image_url
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


        public Restaurant? GetRestaurantById(int restaurantId)
        {
            return _Dbcontext.Restaurants.FirstOrDefault(r => r.Id == restaurantId);
        }

        public void Save()
        {
            _Dbcontext.SaveChanges();
        }

        public void DeleteRestaurant(Restaurant restaurant)
        {
            _Dbcontext.Restaurants.Remove(restaurant);
            Save();
        }

    }
}
