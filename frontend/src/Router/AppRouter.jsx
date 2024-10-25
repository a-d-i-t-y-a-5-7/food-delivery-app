import React from "react";
import { Route, Routes } from "react-router-dom";
import { BaseLayout } from "../Layout/BaseLayout";
import { Home, Login, Register } from "../Pages";
import { RestaurantOrders } from "../Pages/RestaurantOrders/RestaurantOrders";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<BaseLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path='/restaurantOrders' element={<RestaurantOrders/>}/>
    </Routes>
  );
};
