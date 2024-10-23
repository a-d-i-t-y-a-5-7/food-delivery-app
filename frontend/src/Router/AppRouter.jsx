import React from "react";
import { Route, Routes } from "react-router-dom";
import { BaseLayout } from "../Layout/BaseLayout";
import { Home, Login, Register } from "../Pages";


export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<BaseLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};
