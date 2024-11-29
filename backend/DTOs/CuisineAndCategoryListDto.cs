using backend.Models;

namespace backend.DTOs
{
    public class CuisineAndCategoryListDto
    {
        public IEnumerable<CusinesDto> Cuisines { get; set; }
        public required IEnumerable<CategoriesDto> Categories { get; set; }
      
      
    }
    public class CusinesDto
    {
        public int Id { get; set; }
        public string CuisineName { get; set; }
    }
    public class CategoriesDto
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }

    }
}
