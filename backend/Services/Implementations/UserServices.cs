using backend.DTOs;
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services.Implementations
{
    public class UserServices:IUserServices
    {
        private readonly IUserRepository _userRepository;

        public UserServices(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User?>  RegisterUser(RegisterDto newUser)
        {
            return await _userRepository.RegisterUser(newUser);
        }

        public async Task<string?> LoginUser(LoginDto loginUser)
        {
            return await _userRepository.LoginUser(loginUser);
        }

        public async Task UpdateUserProfile(int userId, UpdateUserDto userProfileDto)
        {
             await _userRepository.UpdateUserProfile(userId, userProfileDto);
        }
        public async Task<Address?> AddAddress(AddAddressDto newAddress)
        {
            return await _userRepository.AddAddress(newAddress);
        }
        public async Task<List<Address?>> GetAddressById(int userId, string role)
        {
            return await _userRepository.GetAddressById(userId, role);
        }
        public async Task<bool> DeleteAddressById(int Id)
        {
            return await _userRepository.DeleteAddressById( Id);
        }
        public async Task UpdateAddress(int userId,string role, UpdateAddressDto addressDto)
        {
            await _userRepository.UpdateAddress(userId,role, addressDto);
        }
       
        public async Task<IEnumerable<Order>> GetOrderHistory(int userId)
        {
            return await _userRepository.GetOrderHistory(userId);
        }
    }
}
