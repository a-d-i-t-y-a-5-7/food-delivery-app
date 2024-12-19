import {
  DownOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Input, Layout, Menu, Select } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearAuth } from "../../../../Redux/Slices/authSlice";
import "./Header.css";

const { Search } = Input;
const { Header } = Layout;
const { Option } = Select;

export const HeaderComponent = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { userId } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const handleCuisineChange = (value) => {
    setSelectedCuisine(value);
  };
  const handleSearch = (value) => {
    setSearchQuery("");
    navigate(`/search/${value}`);
  };

  const handleMenuClick = (e) => {
    setMenuVisible(false);
  };

  const handleLogout = (e) => {
    dispatch(clearAuth());
    setMenuVisible(false);
    toast.success("Logout Sucessfull");
    setTimeout(() => {
      navigate("/login");
    }, 100);
  };

  const menuItems = [
    {
      key: "viewProfile",
      label: (
        <Link
          to={`/users/${userId}`}
          onClick={handleMenuClick}
          style={{ textDecoration: "none" }}
        >
          Profile
        </Link>
      ),
    },
    {
      key: "myOrders",
      label: (
        <Link
          to="/myOrders"
          onClick={handleMenuClick}
          style={{ textDecoration: "none" }}
        >
          My Orders
        </Link>
      ),
    },
    {
      key: "logout",
      label: (
        <Link onClick={handleLogout} style={{ textDecoration: "none" }}>
          Logout
        </Link>
      ),
    },
  ];

  return (
    <Header className="headerContainer">
      <div className="logo">
        <Link to={"/"}>
          <img src="/assets/food1.jpg" alt="logo" />
        </Link>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for food or restaurants"
            enterButton
            className="w-100"
            onSearch={handleSearch}
          />
        </div>
      </div>

      <div className="header-icons" style={{ position: "relative" }}>
        {userId ? (
          <>
            <div
              onClick={toggleMenu}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar icon={<UserOutlined />} size="large" />
              <DownOutlined style={{ marginLeft: 5 }} />
            </div>

            {menuVisible && (
              <Menu
                style={{
                  position: "absolute",
                  right: 0,
                  top: "100%",
                  zIndex: 1,
                }}
                items={menuItems}
                className="profile-menu"
              />
            )}

            <Link to="/addtocart" style={{ marginLeft: 10 }}>
              <Badge count={cartItems.length} showZero>
                <ShoppingCartOutlined
                  style={{ fontSize: "28px", color: "#333" }}
                />
              </Badge>
            </Link>
          </>
        ) : (
          <Link to="/login" className="btn border">
            Login
          </Link>
        )}
      </div>
    </Header>
  );
};

export default HeaderComponent;
