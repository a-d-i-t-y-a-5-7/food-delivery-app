import React from "react";
import { Route, Routes } from "react-router-dom";
import { BaseLayout } from "../Layout/BaseLayout";
import {
  AddMenuItem,
  AddRestaurant,
  Address,
  Home,
  Login,
  MenuItem,
  Register,
  RestaurantList,
  RestaurantOrders,
  ViewProfile,
} from "../Pages";

import AddToCart from "../Pages/AddToCart/AddToCart";
import { DeliveryPartnerAssignedOrders } from "../Pages/DeliveryPartnerAsssignedOrders/DeliveryPartnerAssignedOrders";
import MyOrders from "../Pages/MyOrders/MyOrders";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<BaseLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/view-profile" element={<ViewProfile />} />
        <Route path="/address" element={<Address />} />
        <Route path="menuItem/:restaurantId" element={<MenuItem />}></Route>
        <Route path="/addtocart" element={<AddToCart />}></Route>
        <Route path="/myOrders" element={<MyOrders />}></Route>
      </Route>
      <Route
        path="/restaurantOrders/:restaurantId"
        element={<RestaurantOrders />}
      />

      <Route path="/restaurantList" element={<RestaurantList />} />
      <Route path="/addrestaurant" element={<AddRestaurant />}></Route>
      <Route path="/addmenuitem" element={<AddMenuItem />}></Route>

      <Route
        path="/myAssignedOrders"
        element={<DeliveryPartnerAssignedOrders />}
      ></Route>
    </Routes>
  );
};
