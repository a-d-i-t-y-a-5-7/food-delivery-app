import React from "react";
import { Route, Routes } from "react-router-dom";
import { BaseLayout } from "../Layout/BaseLayout";
import { RestaurantOrders } from "../Pages/RestaurantOrders/RestaurantOrders";
import { Home, Login, Register, ViewProfile } from "../Pages";
import Address from "../Pages/Addresses/Address";
import RestaurantList from "../Pages/RestaurantList/RestaurantList";
import AddRestaurant from "../Pages/AddRestaurant/AddRestaurant";
import MenuItem from "../Pages/MenuItem/MenuItem";
import AddMenuItem from "../Pages/AddMenuItem/AddMenuItem";

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
      <Route path='/restaurantOrders/:restaurantId' element={<RestaurantOrders/>}/>
      <Route path="/menuItem" element={<MenuItem />}></Route>
      <Route path='/restaurantList' element={<RestaurantList/>}/>     
      <Route path="/addrestaurant" element={<AddRestaurant/>}></Route>
      <Route path="/addmenuitem" element={<AddMenuItem />}></Route>
    </Routes>
  );
};
