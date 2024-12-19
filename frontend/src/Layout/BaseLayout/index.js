import { Layout } from "antd";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./BaseLayout.css";
import { FooterComponent } from "./Components/Footer/Footer";
import { HeaderComponent } from "./Components/Header/Header";

export const BaseLayout = () => {
  const location = useLocation();
  const showFooter = location.pathname === "/" || location.pathname === "/page";

  return (
    <Layout className="layout">
      <HeaderComponent />
      <Layout>
        <Layout>
          <Outlet className="main-content" />
        </Layout>
      </Layout>
      {showFooter && <FooterComponent />} 
    </Layout>
  );
};
