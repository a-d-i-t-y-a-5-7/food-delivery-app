import { Layout } from "antd";
import "./Header.css";
import { Link } from "react-router-dom";
import React from "react";

const { Header } = Layout;

export const HeaderComponent = () => {
  return (
    <Header className="headerContainer">
      <Link to="/">
        <h3 className="text-dark">Food Delivery app</h3>
      </Link>
    </Header>
  );
};
