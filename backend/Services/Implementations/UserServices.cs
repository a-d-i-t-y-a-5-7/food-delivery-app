using backend.DTOs;
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Services.Implementations
{
    public class UserServices : IUserServices
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public UserServices(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public async Task<User?> RegisterUser(RegisterDto newUser)
        {
            var existingUser = await _userRepository.GetUserByEmail(newUser.Email);
            if (existingUser != null)
            {
                return null;
            }

            var hasher = new PasswordHasher<User>();
            newUser.Password = hasher.HashPassword(null, newUser.Password);
            var user = await _userRepository.RegisterUser(newUser);

            return user;
        }
        public async Task<string?> LoginUser(LoginDto loginUser)
        {
            var user = await _userRepository.GetUserByEmail(loginUser.Email);
            if (user == null)
            {
                return "UserNotFound";
            }

            var hasher = new PasswordHasher<User>();
            var result = hasher.VerifyHashedPassword(user, user.PasswordHash, loginUser.Password);
            if (result != PasswordVerificationResult.Success)
            {
                return null;
            }

            return await GenerateJwtToken(user);
        }
        public async Task<User?> GetUserById(int id)
        {
            return await _userRepository.GetUserById(id);
        }

        public async Task UpdateUserProfile(int userId, UpdateUserDto userProfileDto)
        {
            var existingUser = await _userRepository.GetUserById(userId);
            if (existingUser == null) throw new Exception("User not found");

            existingUser.Name = userProfileDto.Name;
            existingUser.Email = userProfileDto.Email;
            existingUser.PhoneNumber = userProfileDto.PhoneNumber;

            if (!string.IsNullOrEmpty(userProfileDto.Password))
            {
                var hasher = new PasswordHasher<User>();
                existingUser.PasswordHash = hasher.HashPassword(existingUser, userProfileDto.Password);
            }

            await _userRepository.UpdateUser(existingUser);
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
        public async Task UpdateAddress(int Id, UpdateAddressDto addressDto)
        {
            await _userRepository.UpdateAddress(Id,addressDto);
        }
       
        public async Task<IEnumerable<Order>> GetOrderHistory(int userId)
        {
            return await _userRepository.GetOrderHistory(userId);
        }

        private async Task<string> GenerateJwtToken(User user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var secretKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings["SecretKey"]));
            var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var role = await _userRepository.GetUserRole(user.RoleId);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Role, role.RoleType)
            };

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings["ExpireMinutes"])),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
