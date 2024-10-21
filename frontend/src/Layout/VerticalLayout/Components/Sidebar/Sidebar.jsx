import {
  DashboardOutlined,
  EnvironmentOutlined,
  IdcardOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
  VideoCameraAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const items = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: <Link to="/users">Employees</Link>,
    },
    {
      key: "4",
      label: "Miscellaneous",
      icon: <SettingOutlined />,
      children: [
        {
          key: "4-1",
          icon: <TeamOutlined />,
          label: <Link to="/region">Region</Link>,
        },
        {
          key: "4-2",
          icon: <EnvironmentOutlined />,
          label: <Link to="/location">Location</Link>,
        },
        {
          key: "4-3",
          icon: <IdcardOutlined />,
          label: <Link to="/title">Title</Link>,
        },
        {
          key: "4-4",
          icon: <VideoCameraAddOutlined />,
          label: <Link to="/interests">Employee Interest</Link>,
        },

        {
          key: "4-6",
          icon: <UserOutlined />,
          label: <Link to="/role">Role</Link>,
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
