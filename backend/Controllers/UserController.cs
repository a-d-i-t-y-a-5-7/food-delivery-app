using backend.DTOs;
using backend.Models;
using backend.Services.Implementations;
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
            var token = await _userService.LoginUser(loginUser);

            if (token == null)
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            return Ok(new { token, message = "Login successful" });
        }

        [HttpPut("{userId}/update-profile")]
        public async Task<IActionResult> UpdateUserProfile(int userId, [FromBody] UpdateUserDto updateUserProfileDto)
        {
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
    }
}
