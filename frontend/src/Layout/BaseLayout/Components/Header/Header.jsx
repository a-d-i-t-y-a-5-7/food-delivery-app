import { Layout } from "antd";
import "./Header.css";
import React from "react";

const { Header } = Layout;

export const HeaderComponent = () => {
  return (
    <Header className="headerContainer">
      <h3 className="text-dark">Food Delivery app</h3>
    </Header>
  );
};
