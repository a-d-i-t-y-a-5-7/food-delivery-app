import { Layout, Menu, Select } from "antd";
import "./Header.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Input, Avatar, Badge } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DownOutlined,
} from "@ant-design/icons";

const { Search } = Input;
const { Header } = Layout;
const { Option } = Select;

export const HeaderComponent = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState(null);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const handleCuisineChange = (value) => {
    setSelectedCuisine(value);
  };
  const handleSearch = (value) => {
    console.log(`Searching for ${value} in ${selectedCuisine} cuisine`);
    // Add search logic here, e.g., API call with selectedCuisine and search query
  };

  const handleMenuClick = (e) => {
    setMenuVisible(false);
  };

  const menuItems = [
    {
      key: "viewProfile",
      label: (
        <Link
          to="/view-profile/:userId"
          onClick={handleMenuClick}
          style={{ textDecoration: "none" }}
        >
          View Profile
        </Link>
      ),
    },
    {
      key: "selectAddress",
      label: (
        <Link
          to="/address"
          onClick={handleMenuClick}
          style={{ textDecoration: "none" }}
        >
          Select Address
        </Link>
      ),
    },
    {
      key: "logout",
      label: (
        <Link
          to="/login"
          onClick={handleMenuClick}
          style={{ textDecoration: "none" }}
        >
          Logout
        </Link>
      ),
    },
  ];

  return (
    <Header className="headerContainer">
      <div className="logo">
        <img src="/assets/food1.jpg" alt="logo" />
      </div>

      <div className="col-12 col-md-6 col-lg-6 search-bar">
        <div style={{ display: "flex", gap: "8px" }}>
          <Select
            placeholder="Select Cuisine"
            onChange={handleCuisineChange}
            style={{ width: 150 }}
          >
            <Option value="Indian">Indian</Option>
            <Option value="Italian">Italian</Option>
            <Option value="Mexican">Mexican</Option>
            <Option value="Chinese">Chinese</Option>
          </Select>
          <Search
            placeholder="Search for food or restaurants"
            enterButton
            className="w-100"
            onSearch={handleSearch}
          />
        </div>
      </div>

      <div className="header-icons" style={{ position: "relative" }}>
        <div
          onClick={toggleMenu}
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          <Avatar icon={<UserOutlined />} size="large" />
          <DownOutlined style={{ marginLeft: 5 }} />
        </div>

        {menuVisible && (
          <Menu
            style={{ position: "absolute", right: 0, top: "100%", zIndex: 1 }}
            items={menuItems}
            className="profile-menu"
          />
        )}

        <Badge count={5} showZero>
          <ShoppingCartOutlined style={{ fontSize: "28px", color: "#333" }} />
        </Badge>
      </div>
    </Header>
  );
};

export default HeaderComponent;
