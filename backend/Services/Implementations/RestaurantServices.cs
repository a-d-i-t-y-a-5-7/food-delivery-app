﻿using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services.Implementations
{
    public class RestaurantServices : IRestaurantServices
    {
        private readonly IRestaurantRepositories _restaurantRepo;

        public RestaurantServices(IRestaurantRepositories restaurantRepo)
        {
            _restaurantRepo = restaurantRepo;
        }

        public List<Restaurant> GetRestaurants(int ownerId)
        {
            List<Restaurant> restaurants = _restaurantRepo.GetRestaurants(ownerId);

            return restaurants;
        }

        public List<Order> GetOrders(int restaurantId)
        {
            List<Order> orders = _restaurantRepo.GetOrders(restaurantId);
            return orders;
        }
        public async Task<Restaurant> AddRestaurantAsync(Restaurant restaurant)
        {
            Restaurant newRestaurant = await _restaurantRepo.AddRestaurantAsync(restaurant);
            return newRestaurant;
        }

        public bool UpdateRestaurantApprovalStatus(int restaurantId, bool status)
        {
            var restaurant = _restaurantRepo.GetRestaurantById(restaurantId);

            if (restaurant == null)
                return false;
            if(restaurant.IsApproved == false)
            {
                if (status)
                {
                    restaurant.IsApproved = true;
                    _restaurantRepo.Save();
                }
                else
                {
                    _restaurantRepo.DeleteRestaurant(restaurant);
                }
            }
            else
            {
                return false;
            }


            return true;
        }
    }
}
