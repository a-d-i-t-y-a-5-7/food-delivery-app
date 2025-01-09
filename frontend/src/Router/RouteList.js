import { Dashboard } from "../Components/Admin/Dashboard";
import { OrdersList } from "../Components/Admin/OrdersList";
import { RestaurantsList } from "../Components/Admin/RestaurantsList";
import { UserList } from "../Components/Admin/UserList";
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
    element: <LandingPage />,
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
    path: "/search/:query",
    element: <SearchResult />,
    layout: "BaseLayout",
  },
  {
    path: "/users/:userId",
    element: <ViewProfile />,
    layout: "BaseLayout",
    roles: ["user", "admin-level1", "delivery-partner", "restaurant-owner"],
  },
  {
    path: "/address",
    element: <Address />,
    layout: "BaseLayout",
    roles: ["user", "admin-level1", "delivery-partner", "restaurant-owner"],
  },
  {
    path: "/addtocart",
    element: <AddToCart />,
    layout: "BaseLayout",
    roles: ["user", "admin-level1", "delivery-partner", "restaurant-owner"],
  },
  {
    path: "/myOrders",
    element: <MyOrders />,
    layout: "BaseLayout",
    roles: ["user", "admin-level1", "delivery-partner", "restaurant-owner"],
  },
  {
    path: "/restaurantList",
    element: <RestaurantList />,
    layout: "BaseLayout",
    roles: ["admin-level1", "restaurant-owner"],
  },
  {
    path: "/addrestaurant",
    element: <AddRestaurant />,
    layout: "BaseLayout",
    roles: ["restaurant-owner", "admin-level1"],
  },
  {
    path: "/myAssignedOrders",
    element: <DeliveryPartnerAssignedOrders />,
    layout: "BaseLayout",
    roles: ["delivery-partner", "admin-level1"],
  },
  {
    path: "/addmenuitem",
    element: <AddMenuItem />,
    layout: "BaseLayout",
    roles: ["restaurant-owner", "admin-level1"],
  },
  {
    path: "/restaurantOrders/:restaurantId",
    element: <RestaurantOrders />,
    layout: "BaseLayout",
    roles: ["restaurant-owner", "admin-level1"],
  },
  {
    path: "/restaurantDashBoard",
    element: <RestaurantDashBoard />,
    layout: "BaseLayout",
    roles: ["restaurant-owner", "admin-level1"],
  },
  {
    path: "/restaurantMenuItem/:restaurantId",
    element: <RestaurantMenuItem />,
    layout: "BaseLayout",
    roles: ["restaurant-owner", "admin-level1"],
  },
  {
    path: "/admin",
    element: <Dashboard />,
    layout: "AdminLayout",
    roles: ["admin-level1"],
  },
  {
    path: "/admin/users",
    element: <UserList />,
    layout: "AdminLayout",
    roles: ["admin-level1"],
  },
  {
    path: "/admin/restaurants",
    element: <RestaurantsList />,
    layout: "AdminLayout",
    roles: ["admin-level1"],
  },
  {
    path: "/admin/orders",
    element: <OrdersList />,
    layout: "AdminLayout",
    roles: ["admin-level1"],
  },
];
