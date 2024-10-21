import { Layout } from "antd";
import "./Header.css";
import React from "react";

const { Header } = Layout;

export const HeaderComponent = () => {
  return (
    <Header className="headerContainer">
      <h2 className="text-light mb-0">Food Delivery app</h2>
    </Header>
  );
};
