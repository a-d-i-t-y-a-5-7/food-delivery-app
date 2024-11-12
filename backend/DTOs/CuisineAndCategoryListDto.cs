using backend.Models;

namespace backend.DTOs
{
    public class CuisineAndCategoryListDto
    {
        public IEnumerable<Cuisine> Cuisines { get; set; }
        public IEnumerable<Category> Categories { get; set; }     
    }
}
