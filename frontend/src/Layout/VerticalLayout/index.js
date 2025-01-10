import { Layout } from "antd";
import React from "react";
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
          <div className="main-content" style={{ padding: "20px" }}>
            {children}
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
};
