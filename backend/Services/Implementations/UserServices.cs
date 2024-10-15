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
    }
}
