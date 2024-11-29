using backend.DTOs;
using backend.Helper;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;

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
            var orders = _Dbcontext.Orders.ToList();
            var restaurantDtos = restaurants.Select(r =>
            {
                var deliveryTime = (int)orders
                    .Where(o => o.RestaurantId == r.Id && o.PickedAt.HasValue && o.DeliveredAt.HasValue)
                    .Select(o => (o.DeliveredAt.Value - o.PickedAt.Value).TotalMinutes)
                    .DefaultIfEmpty(30) 
                    .Average();

                r.DeliveryTime = deliveryTime;  

                return new RestaurantDto
                {
                    Id = r.Id,
                    OwnerId = r.OwnerId,
                    Name = r.Name,
                    PhoneNumber = r.PhoneNumber,
                    Rating = r.Rating,
                    OpeningTime = r.OpeningTime,
                    ClosingTime = r.ClosingTime,
                    IsApproved = r.IsApproved,
                    IsActive = r.IsActive,
                    image_url = r.ImageUrl,
                    DeliveryTime = deliveryTime,
                    Cuisine = restaurantCuisines
                        .Where(rc => rc.RestaurantId == r.Id)
                        .Select(rc => cuisines.FirstOrDefault(c => c.Id == rc.CuisineId)?.CuisineName)
                        .Where(cuisineName => cuisineName != null)
                        .ToList()
                };
            }).ToList();

            _Dbcontext.SaveChanges();

            return restaurantDtos;
        }
        public List<Restaurant> GetRestaurants(int ownerId)
        {
            List<Restaurant>? restaurants = _Dbcontext.Restaurants.Where(r => r.OwnerId == ownerId).ToList();
            return restaurants;
        }

        public List<OrdersDto> GetOrders(int restaurantId)
        {
            List<Order>? orders = _Dbcontext.Orders.Where(o => o.RestaurantId == restaurantId).ToList();
            List<OrdersDto> ordersDtos = new List<OrdersDto>();
            if (orders != null && orders.Count > 0)
            {
                for (int i = 0; i < orders.Count; i++)
                {
                    OrdersDto dto = new OrdersDto
                    {
                        OrderId = orders[i].Id,
                        Restaurantname = _Dbcontext.Restaurants.Find(orders[i].RestaurantId).Name,
                        CustomerName = _Dbcontext.Users.Find(orders[i].CustomerId).Name,
                        TotalAmount = orders[i].TotalAmount,
                        Status = orders[i].Status,
                        PaymentStatus = orders[i].PaymentStatus
                    };
                    ordersDtos.Add(dto);
                }
            }
            return ordersDtos;
        }
        public async Task<bool> AddRestaurantAsync(RestaurantsDto restaurantDto,IFormFile image)
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
                Restaurant newRestaurant = new Restaurant
                {
                    OwnerId = restaurantDto.OwnerId,
                    Name = restaurantDto.Name,
                    PhoneNumber = restaurantDto.PhoneNumber,
                    OpeningTime = restaurantDto.OpeningTime,
                    ClosingTime = restaurantDto.ClosingTime,
                };
                  if (image != null && image.Length > 0)
                {
                    HelperClass helper = new HelperClass();
                    string? imageUrl = await helper.UploadImageAsync(image);
                    if (imageUrl != null)
                    {
                        newRestaurant.ImageUrl = imageUrl;
                    }
                }
                _Dbcontext.Add(address);
                _Dbcontext.Add(newRestaurant);
                await _Dbcontext.SaveChangesAsync();
                return true;
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

        public bool UpdateRestaurant(string token, RestaurantDto restaurant)
        {
            int id = ReturnIdFromToken(token);
            if (id == restaurant.OwnerId)
            {
                Restaurant? rest = _Dbcontext.Restaurants.Find(restaurant.Id);
                if (rest != null)
                {
                    rest.Name = restaurant.Name;
                    rest.PhoneNumber = restaurant.PhoneNumber;
                    rest.OpeningTime = restaurant.OpeningTime;
                    rest.ClosingTime = restaurant.ClosingTime;
                    rest.ImageUrl = restaurant.image_url;
                    _Dbcontext.SaveChanges();
                    return true;
                }
            }

            return false;
        }

        private int ReturnIdFromToken(string token)
        {
            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
            int userId = -999;

            if (handler.CanReadToken(token))
            {
                JwtSecurityToken jwtToken = handler.ReadJwtToken(token);
                string? id = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "sub")?.Value;
                userId = Convert.ToInt32(id);
            }

            return userId;
        }

        public bool UpdateActiveStatus(string token, int restaurantId)
        {
            int id = ReturnIdFromToken(token);
            Restaurant? restaurant = _Dbcontext.Restaurants.Find(restaurantId);

            if (restaurant != null && id == restaurant.OwnerId)
            {
                if (restaurant.IsActive != null && restaurant.IsActive == true)
                {
                    restaurant.IsActive = false;
                    _Dbcontext.SaveChanges();
                    return true;
                }
                if (restaurant.IsActive != null && restaurant.IsActive == false)
                {
                    restaurant.IsActive = true;
                    _Dbcontext.SaveChanges();
                    return true;
                }
            }

            return false;
        }
    }
}
