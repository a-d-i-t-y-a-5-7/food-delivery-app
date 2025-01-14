import { Breadcrumb, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "../../Helper/UserHelper";

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      const usersData = await fetchAllUsers();
      setUsers(usersData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const roleMapping = {
    1001: "admin-level1",
    1002: "admin-level2",
    1003: "admin-level3",
    1004: "user",
    1005: "delivery-partner",
    1006: "restaurant-owner",
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#e85654",
          color: "#fff",
        },
      }),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#e85654",
          color: "#fff",
        },
      }),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#e85654",
          color: "#fff",
        },
      }),
    },
    {
      title: "Role",
      dataIndex: "roleId",
      key: "roleId",
      render: (roleId) => roleMapping[roleId] || "Unknown",
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#e85654",
          color: "#fff",
        },
      }),
    },
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <>
      <Breadcrumb className="my-3">
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Users</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <Table dataSource={users} columns={columns} rowKey="id" bordered />
      </div>
    </>
  );
};
