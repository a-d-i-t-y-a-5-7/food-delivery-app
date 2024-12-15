import React from "react";
import { Route, Routes } from "react-router-dom";
import { BaseLayout } from "../Layout/BaseLayout";
import { VerticalLayout } from "../Layout/VerticalLayout";
import { routeList } from "./RouteList";
import { ErrorPage } from "../Pages";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRouter = () => {
  return (
    <Routes>
      {routeList.map((route, index) => {
        const { path, element, layout, roles } = route;

        if (roles) {
          return (
            <Route
              key={index}
              path={path}
              element={<ProtectedRoute element={element} roles={roles} />}
            />
          );
        }

        if (layout === "BaseLayout") {
          return (
            <Route key={index} element={<BaseLayout />}>
              <Route path={path} element={element} />
            </Route>
          );
        }

        if (layout === "AdminLayout") {
          return (
            <Route key={index} element={<VerticalLayout />}>
              <Route path={path} element={element} />
            </Route>
          );
        }
        return <Route key={index} path={path} element={element} />;
      })}
    </Routes>
  );
};
