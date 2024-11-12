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

        public List<OrdersDto> GetOrders(int restaurantId)
        {
            List<Order>? orders = _Dbcontext.Orders.Where(o => o.RestaurantId == restaurantId).ToList();
            List<OrdersDto> ordersDtos = new List<OrdersDto>();
            if(orders != null && orders.Count > 0)
            {
                for(int i=0; i<orders.Count; i++)
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
        public async Task<Restaurant> AddRestaurantAsync(Restaurant restaurant)
        {
            bool IsPhonenoExits = await _Dbcontext.Restaurants.AnyAsync(u => u.PhoneNumber == restaurant.PhoneNumber);
            if (IsPhonenoExits)
            {
                throw new ArgumentException($"{restaurant.PhoneNumber}' is already exits");
            }
            try
            {
                _Dbcontext.Add(restaurant);
                await _Dbcontext.SaveChangesAsync();
                return restaurant;
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
