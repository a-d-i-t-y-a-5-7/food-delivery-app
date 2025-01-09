import { Dashboard } from "../Components/Admin/Dashboard";
import { OrdersList } from "../Components/Admin/OrdersList";
import { RestaurantList } from "../Components/Admin/RestaurantList";
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
    path: "/users/:userId",
    element: <ViewProfile />,
    layout: "BaseLayout",
    roles: ["user", "admin-level1"],
  },
  {
    path: "/address",
    element: <Address />,
    layout: "BaseLayout",
    roles: ["user", "admin-level1"],
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
    roles: ["user", "admin-level1"],
  },
  {
    path: "/myOrders",
    element: <MyOrders />,
    layout: "BaseLayout",
    roles: ["user", "admin-level1"],
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
    roles: ["restaurant-owner", "admin-level1"],
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
    element: <RestaurantList />,
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
