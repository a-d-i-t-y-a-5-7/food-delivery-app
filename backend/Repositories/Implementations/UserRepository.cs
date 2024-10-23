using backend.DTOs;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;


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

        public async Task<User?> GetUserByEmail(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }
        public async Task<Role?> GetUserRole(int? roleId)
        {
            return await _context.Roles.FindAsync(roleId);
        }
        public async Task<User?> GetUserById(int userId)
        {
            return await _context.Users.FindAsync(userId);
        }
        public async Task UpdateUser(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }
        public async Task<User?> RegisterUser(RegisterDto newUser)
        {
            var user = new User
            {
                Name = newUser.Name,
                Email = newUser.Email,
                PhoneNumber = newUser.PhoneNumber,
                RoleId = newUser.RoleId,
                PasswordHash = newUser.Password
            };
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
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
