namespace backend.DTOs
{
    public class UpdateOrderPickUpTimeDto
    {
        public int OrderId { get; set; }
        public DateTime? PickedAt { get; set; }

    }
}
