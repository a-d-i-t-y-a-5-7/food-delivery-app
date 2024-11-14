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

            var address = new Address
            {
                EntityId = newAddress.EntityId,
                EntityType = newAddress.EntityType,
                AddressLine1 = newAddress.AddressLine1,
                AddressLine2 = newAddress.AddressLine2,
                City = newAddress.City,
                State = newAddress.State,
                Country = newAddress.Country,
                ZipCode = newAddress.ZipCode,
            };

            _context.Addresses.Add(address);
            await _context.SaveChangesAsync();

            return address;
        }
        public async Task<List<Address>> GetAddressById(int userId, string role)
        {
            return await _context.Addresses
                .Where(a => a.EntityId == userId && a.EntityType == role)
                .ToListAsync();
        }
        //Delete Address whose Entity_Id is not foreign key of Order table
        public async Task<bool> DeleteAddressById( int Id)
        {
            var address = await _context.Addresses
         .FirstOrDefaultAsync(a => a.Id==Id);

            if (address != null)
            {
                _context.Addresses.Remove(address);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
        public async Task UpdateAddress(int Id, UpdateAddressDto addressDto)
        {
         
            var existingAddress = await _context.Addresses
                .FirstOrDefaultAsync(a => a.Id==Id); 

        
            if (existingAddress == null)
            {
                throw new Exception("Address not found for the user.");
            }

            
            existingAddress.AddressLine1 = addressDto.AddressLine1 ?? existingAddress.AddressLine1; 
            existingAddress.AddressLine2 = addressDto.AddressLine2 ?? existingAddress.AddressLine2;
            existingAddress.City = addressDto.City ?? existingAddress.City;
            existingAddress.State = addressDto.State ?? existingAddress.State;
            existingAddress.ZipCode = addressDto.ZipCode ?? existingAddress.ZipCode;
            existingAddress.Country = addressDto.Country ?? existingAddress.Country;
            existingAddress.IsPrimary = addressDto.IsPrimary.HasValue ? addressDto.IsPrimary.Value : existingAddress.IsPrimary;

            _context.Addresses.Update(existingAddress);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Order>> GetOrderHistory(int userId)
        {
            return await _context.Orders
                .Where(order => order.CustomerId == userId)
                .ToListAsync();
        }

    }
}
