import React, { useEffect, useState } from "react";
import { Spin, Table } from "antd";
import { fetchRestaurants } from "../../Helper/UserHelper";

export const RestaurantList = () => {
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
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (isActive ? "Active" : "Inactive"),
    },
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <Table dataSource={restaurants} columns={columns} rowKey="id" />
    </div>
  );
};
