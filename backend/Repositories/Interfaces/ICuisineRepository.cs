using backend.DTOs;

namespace backend.Repositories.Interfaces
{
    public interface ICuisineRepository
    {
        public bool AddCuisine(CuisineDto cuisine);
        public List<CuisineDto> GetAllCuisines();
    }
}
