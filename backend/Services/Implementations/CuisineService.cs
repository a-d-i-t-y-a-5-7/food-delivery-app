using backend.DTOs;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services.Implementations
{
    public class CuisineService : ICuisineService
    {
        private readonly ICuisineRepository _cuisineRepository;

        public CuisineService(ICuisineRepository cuisineRepository)
        {
            _cuisineRepository = cuisineRepository;
        }

        public bool AddCuisine(CuisineDto cuisine)
        {
            bool result = _cuisineRepository.AddCuisine(cuisine);
            return result;
        }

        public List<CuisineDto> GetAllCuisines()
        {
            List<CuisineDto> cuisineDtoList = _cuisineRepository.GetAllCuisines();
            return cuisineDtoList;
        }
    }
}
