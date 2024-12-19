import {
  AddMenuItem,
  AddRestaurant,
  AddToCart,
  Address,
  DeliveryPartnerAssignedOrders,
  Home,
  Login,
  MenuItem,
  MyOrders,
  Register,
  RestaurantList,
  RestaurantOrders,
  SearchResult,
  ViewProfile,
} from "../Pages";
import { RestaurantDashBoard } from "../Pages/DashBoard/RestaurantDashBoard/RestaurantDashBoard";
import LandingPage from "../Pages/LandingPage/LandingPage";
import { RestaurantMenuItem } from "../Pages/RestaurantMenuItem/RestaurantMenuItem";
export const routeList = [
  {
    path: "/login",
    element: <Login />,
    layout: null,
  },
  {
    path: "/register",
    element: <Register />,
    layout: null,
  },
  {
    path: "/",
    element: <LandingPage/>,
    layout: "BaseLayout",
  },
  {
    path: "/home",
    element: <Home />,
    layout: "BaseLayout",
  },
  {
    path: "/menuItem/:restaurantId",
    element: <MenuItem />,
    layout: "BaseLayout",
  },
  {
    path: "/users/:userId",
    element: <ViewProfile />,
    layout: "BaseLayout",
    roles: ["user", "admin"],
  },
  {
    path: "/address",
    element: <Address />,
    layout: "BaseLayout",
    roles: ["user"],
  },
  {
    path: "/search/:query",
    element: <SearchResult />,
    layout: "BaseLayout",
  },
  {
    path: "/addtocart",
    element: <AddToCart />,
    layout: "BaseLayout",
    roles: ["user"],
  },
  {
    path: "/myOrders",
    element: <MyOrders />,
    layout: "BaseLayout",
    roles: ["user"],
  },
  {
    path: "/restaurantList",
    element: <RestaurantList />,
    layout: "BaseLayout",
    roles: ["admin"],
  },
  {
    path: "/addrestaurant",
    element: <AddRestaurant />,
    layout: "BaseLayout",
    roles: ["restaurant-owner"],
  },
  {
    path: "/myAssignedOrders",
    element: <DeliveryPartnerAssignedOrders />,
    layout: "BaseLayout",
     roles: ["restaurant-owner"],
  },
  {
    path: "/addmenuitem",
    element: <AddMenuItem />,
    layout: "BaseLayout",
    roles: ["restaurant-owner"],
  },
  {
    path: "/restaurantOrders/:restaurantId",
    element: <RestaurantOrders />,
    layout: "BaseLayout",
    roles: ["user"],
  },
  {
    path:"/restaurantDashBoard",
    element:<RestaurantDashBoard />,
    layout:"BaseLayout",
    roles:["restaurant-owner"]
  },
  {
    path:"/restaurantMenuItem/:restaurantId",
    element:<RestaurantMenuItem />,
    layout:"BaseLayout",
    roles:["restaurant-owner"]
  }
  
];
