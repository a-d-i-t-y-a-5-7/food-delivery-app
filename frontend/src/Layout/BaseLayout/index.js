import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import "./BaseLayout.css";
import { FooterComponent } from "./Components/Footer/Footer";
import { HeaderComponent } from "./Components/Header/Header";

export const BaseLayout = () => {
  return (
    <Layout className="layout">
      <HeaderComponent />
      <Layout>
        <Layout>
          <Outlet className="main-content" />
        </Layout>
      </Layout>
      {/* <FooterComponent /> */}
    </Layout>
  );
};
