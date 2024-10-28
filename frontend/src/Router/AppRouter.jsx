import React from "react";
import { Route, Routes } from "react-router-dom";
import { VerticalLayout} from "../Layout/VerticalLayout";
import { Home, Login, Register } from "../Pages";
import AddRestaurant from "../Pages/AddRestaurant/AddRestaurant";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";


export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/addrestaurant" element={<AddRestaurant />} />
      <Route element={<VerticalLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};
