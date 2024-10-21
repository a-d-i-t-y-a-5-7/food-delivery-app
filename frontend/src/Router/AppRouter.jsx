import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../Pages/Login/Login";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};
