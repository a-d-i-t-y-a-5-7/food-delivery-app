import { Layout } from "antd";
import React from "react";
import "./BaseLayout.css";
import { HeaderComponent } from "./Components/Header/Header";

export const BaseLayout = ({ children }) => {
  return (
    <Layout className="layout">
      <HeaderComponent />
      <Layout>
        <Layout>
          <div className="main-content">{children}</div>
        </Layout>
      </Layout>
    </Layout>
  );
};
