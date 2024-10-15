namespace backend.DTOs
{
    public class LoginDto
    {
        public required string Email { get; set; } = null!;
        public required string Password { get; set; } = null!;
    }
}
