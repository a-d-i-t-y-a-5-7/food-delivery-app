import React from "react";
import { useSelector } from "react-redux";
import { BaseLayout } from "../Layout/BaseLayout";
import { VerticalLayout } from "../Layout/VerticalLayout";
import { ErrorPage } from "../Pages";

export const ProtectedRoute = ({ element, roles, errorCode = 403, layout }) => {
  const userRole = useSelector((state) => state.auth.role);

  if (!userRole || !roles.includes(userRole)) {
    return <ErrorPage errorCode={errorCode} errorMessage="Access Forbidden" />;
  }
  if (layout === "BaseLayout") {
    return <BaseLayout>{element}</BaseLayout>;
  }

  if (layout === "AdminLayout") {
    return <VerticalLayout>{element}</VerticalLayout>;
  }
};
