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

        [HttpPut("{userId}/update-profile")]
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
        public async Task<IActionResult> AddAddress(AddAddressDto registerAddress)
        {
            var result = await _userService.AddAddress(registerAddress);

            if (result != null)
            {
                return Ok(new { message = "Address registered successfully", data = result });
            }
            else
            {
                return BadRequest(new { message = "User already exists" });
            }
        }
        [HttpGet("get-address/{userId}")]
        public async Task<IActionResult> GetAddressByUserId(int userId)
        {
            var address = await _userService.GetAddressByUserId(userId);

            if (address == null)
            {
                return NotFound(new { message = "No Address Found" });
            }

            return Ok(address);
        }
        [HttpDelete("delete-Address/{entityId}")]
        public async Task<IActionResult> DeleteAddressByEntityId(int entityId)
        {
            var result = await _userService.DeleteAddressByEntityId(entityId);
            if (result)
            {
                return Ok(new { message = "Address deleted successfully." });
            }
            return NotFound(new { message = "Address not found." });
        }
        [HttpPut("update-address/{userId}")]
        public async Task<IActionResult> UpdateAddress(int userId, [FromBody] UpdateAddressDto updateAddressDto)
        {
            try
            {
                await _userService.UpdateAddress(userId, updateAddressDto);
                return Ok(new { message = "User address updated successfully." });
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
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
