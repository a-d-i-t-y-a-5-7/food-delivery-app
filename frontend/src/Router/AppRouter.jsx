import React from "react";
import { Route, Routes } from "react-router-dom";
import { BaseLayout } from "../Layout/BaseLayout";
import {
  AddMenuItem,
  AddRestaurant,
  AddToCart,
  Address,
  DeliveryPartnerAssignedOrders,
  Home,
  Login,
  MenuItem,
  Register,
  RestaurantList,
  RestaurantOrders,
  SearchResult,
  ViewProfile,
} from "../Pages";
import MyOrders from "../Pages/MyOrders/MyOrders";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<BaseLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/users/:userId" element={<ViewProfile />} />
        <Route path="/address" element={<Address />} />
        <Route path="/menuItem/:restaurantId" element={<MenuItem />}></Route>
        <Route path="/addtocart" element={<AddToCart />}></Route>
        <Route path="/myOrders" element={<MyOrders />}></Route>
        <Route path="/search/:query" element={<SearchResult />} />
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
