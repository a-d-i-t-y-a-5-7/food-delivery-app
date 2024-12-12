import React from "react";
import { Route, Routes } from "react-router-dom";
import { BaseLayout } from "../Layout/BaseLayout";
import { VerticalLayout } from "../Layout/VerticalLayout";
import { routeList } from "./RouteList";

export const AppRouter = () => {
  return (
    <Routes>
      {routeList.map((route, index) => {
        const { path, element, layout } = route;

        if (layout === "BaseLayout") {
          return (
            <Route element={<BaseLayout />}>
              <Route key={index} path={path} element={element} />
            </Route>
          );
        }

        if (layout === "AdminLayout") {
          return (
            <Route element={<VerticalLayout />}>
              <Route key={index} path={path} element={element} />
            </Route>
          );
        }
        return <Route key={index} path={path} element={element} />;
      })}
    </Routes>
  );
};
