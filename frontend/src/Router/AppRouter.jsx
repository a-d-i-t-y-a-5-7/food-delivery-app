import React from "react";
import { Route, Routes } from "react-router-dom";
import { BaseLayout } from "../Layout/BaseLayout";
import { Login } from "../Pages/Login/Login";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path="/" element={<Login />} />
      </Route>
    </Routes>
  );
};
