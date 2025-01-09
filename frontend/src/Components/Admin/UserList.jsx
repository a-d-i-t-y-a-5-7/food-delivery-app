import { Spin, Table } from "antd";
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <Table dataSource={users} columns={columns} rowKey="id" />
    </div>
  );
};
