

namespace backend.DTOs
{
    public class AddReviewDto
    {
        public int? OrderId { get; set; }

        public int? Rating { get; set; }

        public string? Comment { get; set; }

        public string? ReviewType { get; set; }

        public DateTime? CreatedAt { get; set; }
    }
}
