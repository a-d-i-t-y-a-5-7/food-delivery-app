using System.Text.Json.Serialization;

namespace backend.DTOs
{
    public class ApiResponse
    {
        [JsonPropertyName("imageUrl")]
        public string ImageUrl { get; set; }
    }
}
