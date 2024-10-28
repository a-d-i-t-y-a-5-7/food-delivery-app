import { Layout } from "antd";
import "./Header.css";
import { Link } from "react-router-dom";
import React from "react";
import { Input, Avatar, Badge } from 'antd';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
const { Search } = Input;
const { Header } = Layout;

export const HeaderComponent = () => {
  return (
    <Header className="headerContainer">
    <div className="logo">
      <img src="/assets/food1.jpg" alt='logo'/>
    </div>

    <div className="search-bar">
      <Search 
        placeholder="Search for food or restaurants"
        enterButton
      />
    </div>

    <div className="header-icons">
      <Avatar icon={<UserOutlined />} size="large" />
      <Badge count={5} showZero>
        <ShoppingCartOutlined style={{ fontSize: '28px', color: '#333' }} />
      </Badge>
    </div>
  </Header>

    
  );
};
