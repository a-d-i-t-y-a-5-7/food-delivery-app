using backend.DTOs;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserServices _userService;

        public UserController(IUserServices userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser(RegisterDto registerUser)
        {
            if (registerUser == null)
            {
                return BadRequest(new { message = "Invalid request data" });
            }
            var result = await _userService.RegisterUser(registerUser);

            if (result!=null)
            {
                return Ok(new { message = "User registered successfully", data = result });
            }
            else
            {
                return BadRequest(new { message = "User already exists" });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginUser)
        {
            if (loginUser == null)
            {
                return BadRequest(new { message = "Invalid request data" });
            }
            var token = await _userService.LoginUser(loginUser);

            if(token == "UserNotFound")
            {
                return BadRequest(new {message="User Not Found"});
            }

            if (token == null)
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            return Ok(new { token, message = "Login successful" });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            if(id == 0)
            {
                return BadRequest(new { message = "UserId is not provided" });
            }
            var user = await _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound(new {message="User Not Found"});
            }
            return Ok(user);
        }

        [HttpPatch("{userId}/update-profile")]
        public async Task<IActionResult> UpdateUserProfile(int userId, [FromBody] UpdateUserDto updateUserProfileDto)
        {
            if (updateUserProfileDto == null)
            {
                return BadRequest(new { message = "Invalid request data" });
            }
            try
            {
                await _userService.UpdateUserProfile(userId, updateUserProfileDto);
                return Ok(new { message = "User profile updated successfully." });
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("add-Address")]
        public async Task<IActionResult> AddAddress([FromBody] AddAddressDto newAddress)
        {
            var result = await _userService.AddAddress(newAddress);

            if (result != null)
            {
                return Ok(new { message = "Address registered successfully", data = result });
            }
            else
            {
                return BadRequest(new { message = "Failed to add address" });
            }
        }
        [HttpGet("get-address")]
        public async Task<IActionResult> GetAddress(int userId, string role)
        {
            var addresses = await _userService.GetAddressById(userId, role);

            if (addresses == null || !addresses.Any())
            {
                return NotFound(new { message = "No addresses found for the specified UserId and Role." });
            }

            return Ok(addresses);
        }

        [HttpDelete("delete-Address/{Id}")]
        public async Task<IActionResult> DeleteAddressById(int Id)
        {
            var result = await _userService.DeleteAddressById(Id);
            if (result)
            {
                return Ok(new { message = "Address deleted successfully." });
            }
            return NotFound(new { message = "Address not found." });
        }
        [HttpPut("update-address/{Id}")]
        public async Task<IActionResult> UpdateAddress(int Id, [FromBody] UpdateAddressDto updateAddressDto)
        {
            if (updateAddressDto == null)
            {
                return BadRequest(new { message = "Invalid request data" });
            }
            try
            {
                await _userService.UpdateAddress(Id ,updateAddressDto);
                return Ok(new { message = "Address updated successfully." });
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPatch("{userId}/set-primary/{addressId}")]
        public async Task<IActionResult> SetPrimaryAddress(int userId,int addressId)
        {
            var result = await _userService.SetPrimaryAddress(userId,addressId);

            if (!result)
            {
                return NotFound($"Address with ID {addressId} not found or could not be updated.");
            }

            return Ok(new {message=$"Address set as primary."});
        }

        [HttpGet("view-order-history/{userId}")]
        public async Task<IActionResult> GetOrderHistory(int userId)
        {
            try
            {
                var orders = await _userService.GetOrderHistory(userId);
                if (!orders.Any())
                {
                    return NotFound("No orders found.");
                }
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


    }
}
