using backend.DTOs;
using backend.Models;

namespace backend.Services.Interfaces
{
    public interface IUserServices
    {
        Task<User?> RegisterUser(RegisterDto newUser);
        Task<string?> LoginUser(LoginDto loginUser);
        Task UpdateUserProfile(int userId, UpdateUserDto userProfileDto);
    }
}
