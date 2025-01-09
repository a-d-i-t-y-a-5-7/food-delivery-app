import { Breadcrumb, Spin, Table } from "antd";
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
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#e85654",
          color: "#fff",
        },
      }),
    },
    {
      title: "Delivery Partner Id",
      dataIndex: "deliveryPartnerId",
      key: "deliveryPartnerId",
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#e85654",
          color: "#fff",
        },
      }),
    },
    {
      title: "Restaurant Id",
      dataIndex: "restaurantId",
      key: "restaurantId",
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#e85654",
          color: "#fff",
        },
      }),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
        <Breadcrumb.Item>Orders</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <Table dataSource={orders} columns={columns} rowKey="id" bordered />
      </div>
    </>
  );
};
