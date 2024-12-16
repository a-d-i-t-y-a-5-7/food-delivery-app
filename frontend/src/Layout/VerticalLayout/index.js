import { Layout } from "antd";
import React from "react";
import { FooterComponent } from "../BaseLayout/Components/Footer/Footer";
import { HeaderComponent } from "../BaseLayout/Components/Header/Header";
import { Sidebar } from "./Components/Sidebar/Sidebar";

export const VerticalLayout = ({ children }) => {
  const { Sider } = Layout;
  return (
    <Layout className="layout">
      <HeaderComponent />
      <Layout>
        <Sider className="sider site-layout-background">
          <Sidebar />
        </Sider>
        <Layout className="main-content-layout">
          <div className="main-content">{children}</div>
        </Layout>
      </Layout>
      <FooterComponent />
    </Layout>
  );
};
