using backend.DTOs;
using backend.Repositories.Interfaces;

namespace backend.Services.Interfaces
{
    public interface ICuisineService
    {
        public bool AddCuisine(CuisineDto cuisine);
        public List<CuisineDto> GetAllCuisines();
    }
}
