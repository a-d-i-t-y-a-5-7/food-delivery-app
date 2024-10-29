import React from "react";
import { Route, Routes } from "react-router-dom";
import { BaseLayout } from "../Layout/BaseLayout";
import { RestaurantOrders } from "../Pages/RestaurantOrders/RestaurantOrders";
import { Home, Login, Register, ViewProfile } from "../Pages";
import Address from "../Pages/Addresses/Address";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<BaseLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/view-profile/:userId" element={<ViewProfile />} />
        <Route path="/address" element={<Address/>}/>
      </Route>
      <Route path='/restaurantOrders' element={<RestaurantOrders/>}/>
      
    </Routes>
  );
};
