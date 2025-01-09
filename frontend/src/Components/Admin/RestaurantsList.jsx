import React, { useEffect, useState } from "react";
import { Breadcrumb, Spin, Table } from "antd";
import { fetchRestaurants } from "../../Helper/UserHelper";

export const RestaurantsList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRestaurants = async () => {
    try {
      const restaurantData = await fetchRestaurants();
      setRestaurants(restaurantData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  const columns = [
    {
      title: "Restaurant Name",
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
      title: "Phone Number",
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
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#e85654",
          color: "#fff",
        },
      }),
      render: (isActive) => (isActive ? "Active" : "Inactive"),
    },
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <>
      <Breadcrumb className="my-3">
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Restaurants</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <Table
          dataSource={restaurants}
          columns={columns}
          rowKey="id"
          bordered
        />
      </div>
    </>
  );
};
