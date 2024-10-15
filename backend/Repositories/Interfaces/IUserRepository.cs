using backend.DTOs;
using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> RegisterUser(RegisterDto newUser);
        Task<string?> LoginUser(LoginDto loginUser);
        Task UpdateUserProfile(int userId,UpdateUserDto user);

    }
}
