import React from "react";
import { useSelector } from "react-redux";
import { ErrorPage } from "../Pages";

export const ProtectedRoute = ({ element, roles, errorCode = 403 }) => {
  const userRole = useSelector((state) => state.auth.role);

  if (!userRole || !roles.includes(userRole)) {
    return <ErrorPage errorCode={errorCode} errorMessage="Access Forbidden" />;
  }
  return element;
};
