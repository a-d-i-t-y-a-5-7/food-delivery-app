using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class RestaurantCuisine
{
    public int Id { get; set; }

    public int? RestaurantId { get; set; }

    public int? CuisineId { get; set; }

    public virtual Cuisine? Cuisine { get; set; }

    public virtual Restaurant? Restaurant { get; set; }
}
