using backend.DTOs;
using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetUserByEmail(string email);
        Task<Role?> GetUserRole(int? roleId);
        Task<User?> GetUserById(int userId);
        Task UpdateUser(User user);
        Task<User?> RegisterUser(RegisterDto newUser);
        Task<Address?> AddAddress(AddAddressDto newAddress);
        Task<List<Address>> GetAddressByUserId(int userId);
        Task<bool> DeleteAddressByEntityId(int entityId);
        Task UpdateAddress(int userId, UpdateAddressDto addressDto);
        Task<IEnumerable<Order>> GetOrderHistory(int userId);

    }
}
