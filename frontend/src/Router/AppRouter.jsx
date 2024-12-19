import React from "react";
import { Route, Routes } from "react-router-dom";
import { BaseLayout } from "../Layout/BaseLayout";
import { VerticalLayout } from "../Layout/VerticalLayout";
import { ErrorPage } from "../Pages";
import { ProtectedRoute } from "./ProtectedRoute";
import { routeList } from "./RouteList";

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
              element={
                <ProtectedRoute
                  element={element}
                  roles={roles}
                  layout={layout}
                />
              }
            />
          );
        }

        if (layout === "BaseLayout") {
          return (
            <Route path={path} element={<BaseLayout>{element}</BaseLayout>} />
          );
        }

        if (layout === "AdminLayout") {
          return (
            <Route
              path={path}
              element={<VerticalLayout>{element}</VerticalLayout>}
            />
          );
        }
        return <Route key={index} path={path} element={element} />;
      })}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
