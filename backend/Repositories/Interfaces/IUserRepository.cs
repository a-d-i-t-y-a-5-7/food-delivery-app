using backend.DTOs;
using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> RegisterUser(RegisterDto newUser);
        Task<string?> LoginUser(LoginDto loginUser);
        Task UpdateUserProfile(int userId,UpdateUserDto user);
        Task<Address?> AddAddress(AddAddressDto newAddress);
        Task<List<Address>> GetAddressById(int userId, string role);
        Task<bool> DeleteAddressById(int Id);
        Task UpdateAddress(int Id, UpdateAddressDto addressDto);
        Task<IEnumerable<Order>> GetOrderHistory(int userId);
        

    }
}
