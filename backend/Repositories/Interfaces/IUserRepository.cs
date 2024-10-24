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
        Task<List<Address>> GetAddressByUserId(int userId);
        Task<bool> DeleteAddressByEntityId(int entityId);
        Task UpdateAddress(int userId, UpdateAddressDto addressDto);
        Task<IEnumerable<Order>> GetOrderHistory(int userId);

    }
}
