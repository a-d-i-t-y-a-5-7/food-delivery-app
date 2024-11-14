using backend.DTOs;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.Identity.Client;

namespace backend.Repositories.Implementations
{
    public class CuisineRepository : ICuisineRepository
    {
        private readonly FoodDeliveryDbContext _context;

        public CuisineRepository(FoodDeliveryDbContext context)
        {
            _context = context;
        }

        public bool AddCuisine(CuisineDto cuisine)
        {
            Cuisine? checkIfPresent = _context.Cuisines.FirstOrDefault(c => c.CuisineName!= null && cuisine.CuisineName != null && c.CuisineName.ToLower() == cuisine.CuisineName.ToLower());
            if(checkIfPresent == null)
            {
                Cuisine newCuisine = new Cuisine
                {
                    CuisineName = cuisine.CuisineName
                };

                _context.Cuisines.Add(newCuisine);
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        public List<CuisineDto> GetAllCuisines()
        {
            List<Cuisine> cuisines = _context.Cuisines.ToList();
            List<CuisineDto> cuisinesDtoList = new List<CuisineDto>();

            if(cuisines!=null && cuisines.Count > 0)
            {
                for(int i=0; i<cuisines.Count; i++)
                {
                    CuisineDto dto = new CuisineDto
                    {
                        CuisineId = cuisines[i].Id,
                        CuisineName = cuisines[i].CuisineName
                    };
                    cuisinesDtoList.Add(dto);
                }
            }

            return cuisinesDtoList;
        }
    }
}
