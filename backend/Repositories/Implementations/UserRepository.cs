using backend.DTOs;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Repositories.Implementations
{
    public class UserRepository:IUserRepository
    {
        private readonly FoodDeliveryDbContext _context;
        private readonly IConfiguration _configuration;
        public UserRepository(FoodDeliveryDbContext context, IConfiguration configuration)
        {
            _configuration = configuration;
            _context = context;
        }

        public async Task<User?> RegisterUser(RegisterDto newUser)
        {
            User? existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == newUser.Email);

            if (existingUser == null)
            {
                var hasher = new PasswordHasher<User>();

                User obj = new User
                {
                    Name = newUser.Name,
                    Email = newUser.Email,
                    PhoneNumber = newUser.PhoneNumber,
                    RoleId = newUser.RoleId,
                    PasswordHash = hasher.HashPassword(null, newUser.PasswordHash)
                };

                await _context.Users.AddAsync(obj);
                await _context.SaveChangesAsync();
                return obj;
            }

            return null;
        }

        public async Task<string> LoginUser(LoginDto loginUser)
        {
            User? existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginUser.Email);

            if (existingUser != null)
            {
                var hasher = new PasswordHasher<User>();
                var passwordVerification = hasher.VerifyHashedPassword(existingUser, existingUser.PasswordHash, loginUser.Password);

                if (passwordVerification == PasswordVerificationResult.Success)
                {
                    return await GenerateJwtToken(existingUser);
                }
            }

            return null;
        }

        public async Task UpdateUserProfile(int userId, UpdateUserDto user)
        {
            var existingUser = await _context.Users.FindAsync(userId);
            if (existingUser != null)
            {
                var hasher = new PasswordHasher<User>();
                existingUser.Name = user.Name;
                existingUser.Email = user.Email;
                existingUser.PhoneNumber = user.PhoneNumber;

                if (!string.IsNullOrEmpty(user.Password))
                {
                    existingUser.PasswordHash = hasher.HashPassword(existingUser, user.Password);
                }

                _context.Users.Update(existingUser);
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception("User not found.");
            }
        }

        public async Task<string >GenerateJwtToken(User user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var secretKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings["SecretKey"]));
            var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            Role? role = await _context.Roles.FindAsync(user.RoleId);


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
