using backend.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodItemController : ControllerBase
    {
        private readonly IFoodItemServices _foodItemServices;

        public FoodItemController(IFoodItemServices foodItemServices)
        {
            _foodItemServices = foodItemServices;
        }

        [HttpDelete("delete-menu-item/{id}")]
        public IActionResult DeleteFoodItem(int id)
        {
            bool result = _foodItemServices.DeleteFoodItem(id);

            if (result)
            {
                return StatusCode(204, new { message = "Food Item Deleted Successfuly" });
            }

            return StatusCode(404, new { message = "Food Item Not Found" });
        }
    }
}
