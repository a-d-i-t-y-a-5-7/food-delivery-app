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
        Task<List<Address>> GetAddressById(int userId, string role);
        Task<List<Address>> GetAddressesById(int userId);
        Task<bool> SetPrimary(int addressId);
        Task<bool> DeleteAddressById(int Id);
        Task UpdateAddress(int Id, UpdateAddressDto addressDto);
        Task<IEnumerable<Order>> GetOrderHistory(int userId);
        

    }
}
