import {
  DashboardOutlined,
  EnvironmentOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const items = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: <Link to="/admin">Dashboard</Link>,
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: <Link to="/admin/users">Users</Link>,
    },
    {
      key: "3",
      label: "Miscellaneous",
      icon: <SettingOutlined />,
      children: [
        {
          key: "3-1",
          icon: <TeamOutlined />,
          label: <Link to="/admin/restaurants">Restaurants</Link>,
        },
        {
          key: "3-2",
          icon: <EnvironmentOutlined />,
          label: <Link to="/admin/orders">Orders</Link>,
        },
      ],
    },
  ];

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      style={{ height: "100%", borderRight: 0 }}
      items={items}
    />
  );
};
