import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import { HeaderComponent } from "../BaseLayout/Components/Header/Header";
import { FooterComponent } from "../BaseLayout/Components/Footer/Footer";
import { Sidebar } from "./Components/Sidebar/Sidebar";

export const VerticalLayout = () => {
  const { Sider } = Layout;
  return (
    <Layout className="layout">
      <HeaderComponent />
      <Layout>
        <Sider className="sider site-layout-background">
          <Sidebar />
        </Sider>
        <Layout className="main-content-layout">
          <Outlet />
        </Layout>
      </Layout>
      <FooterComponent />
    </Layout>
  );
};
