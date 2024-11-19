using backend.DTOs;
using backend.Models;

namespace backend.Services.Interfaces
{
    public interface IUserServices
    {
        Task<User?> RegisterUser(RegisterDto newUser);
        Task<string?> LoginUser(LoginDto loginUser);
        Task<User?> GetUserById(int id);
        Task UpdateUserProfile(int userId, UpdateUserDto userProfileDto);
        Task<Address?> AddAddress(AddAddressDto newAddress);
        Task<List<Address>> GetAddressById(int userId, string role);
        Task<bool>SetPrimaryAddress(int userId, int addressId);
        Task<bool> DeleteAddressById(int Id);
        Task UpdateAddress(int Id, UpdateAddressDto addressDto);
        Task<IEnumerable<Order>> GetOrderHistory(int userId);

    }
}
