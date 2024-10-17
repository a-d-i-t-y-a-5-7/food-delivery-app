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

                User registerUser = new User
                {
                    Name = newUser.Name,
                    Email = newUser.Email,
                    PhoneNumber = newUser.PhoneNumber,
                    RoleId = newUser.RoleId,
                    PasswordHash = hasher.HashPassword(null, newUser.PasswordHash)
                };

                await _context.Users.AddAsync(registerUser);
                await _context.SaveChangesAsync();
                return registerUser;
            }

            return null;
        }

        public async Task<string?> LoginUser(LoginDto loginUser)
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
        public async Task<Address?> AddAddress(AddAddressDto newAddress)
        {

            Address? existingAddress = await _context.Addresses
                .FirstOrDefaultAsync(a => a.EntityId == newAddress.EntityId && a.EntityType == newAddress.EntityType);

            if (existingAddress == null)
            {
                Address address = new Address
                {
                    EntityId = newAddress.EntityId,
                    EntityType = newAddress.EntityType,
                    AddressLine1 = newAddress.AddressLine1,
                    AddressLine2 = newAddress.AddressLine2,
                    City = newAddress.City,
                    State = newAddress.State,
                    ZipCode = newAddress.ZipCode,
                    Country = newAddress.Country,

                };

                await _context.Addresses.AddAsync(address);
                await _context.SaveChangesAsync();
                return address;
            }

            return null;
        }
        public async Task<List<Address>> GetAddressByUserId(int userId)
        {
            return await _context.Addresses
         .Where(a => a.EntityId == userId && (a.EntityType == "USER" || a.EntityType == "RESTAURANT"))
         .ToListAsync();
        }
        //Delete Address whose Entity_Id is not foreign key of Order table
        public async Task<bool> DeleteAddressByEntityId(int entityId)
        {
            var address = await _context.Addresses.FindAsync(entityId);
            if (address != null)
            {
                _context.Addresses.Remove(address);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
        public async Task UpdateAddress(int userId, UpdateAddressDto addressDto)
        {
            var existingAddress = await _context.Addresses.FirstOrDefaultAsync(a => a.EntityId == userId);

            if (existingAddress != null)
            {
                existingAddress.AddressLine1 = addressDto.AddressLine1;
                existingAddress.AddressLine2 = addressDto.AddressLine2;
                existingAddress.City = addressDto.City;
                existingAddress.State = addressDto.State;
                existingAddress.ZipCode = addressDto.ZipCode;
                existingAddress.Country = addressDto.Country;
                existingAddress.IsPrimary = addressDto.IsPrimary;

                _context.Addresses.Update(existingAddress);
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Address not found for the user.");
            }
        }
        public async Task<IEnumerable<Order>> GetOrderHistory(int userId)
        {
            return await _context.Orders
                .Where(order => order.CustomerId == userId)
                .ToListAsync();
        }


    }
}
