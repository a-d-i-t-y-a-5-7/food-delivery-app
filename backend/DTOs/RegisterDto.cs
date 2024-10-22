namespace backend.DTOs
{
    public class RegisterDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }=null!;
        public required string Email { get; set; }= null!;
        public required string Password { get; set; } = null!;
        public string? PhoneNumber { get; set; }
        public int? RoleId { get; set; }
    }
}
