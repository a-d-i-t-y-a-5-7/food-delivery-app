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
import { AddCuisine } from "../Components/Admin/AddCuisine";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<BaseLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/view-profile" element={<ViewProfile />} />
        <Route path="/address" element={<Address />} />
      </Route>
      <Route
        path="/restaurantOrders/:restaurantId"
        element={<RestaurantOrders />}
      />
      <Route path="/menuItem" element={<MenuItem />}></Route>
      <Route path="/restaurantList" element={<RestaurantList />} />
      <Route path="/addrestaurant" element={<AddRestaurant />}></Route>
      <Route path="/addmenuitem" element={<AddMenuItem />}></Route>
    </Routes>
  );
};
