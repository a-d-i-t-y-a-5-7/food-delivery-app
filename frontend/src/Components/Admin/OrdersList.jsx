import { Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { fetchAllOrders } from "../../Helper/OrderHelper";

export const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      const ordersData = await fetchAllOrders();
      setOrders(ordersData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const columns = [
    {
      title: "Customer Id",
      dataIndex: "customerId",
      key: "customerId",
    },
    {
      title: "Delivery Partner Id",
      dataIndex: "deliveryPartnerId",
      key: "deliveryPartnerId",
    },
    {
      title: "Restaurant Id",
      dataIndex: "restaurantId",
      key: "restaurantId",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <Table dataSource={orders} columns={columns} rowKey="id" />
    </div>
  );
};
