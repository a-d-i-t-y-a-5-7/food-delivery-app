import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  restaurantOrders,
  updateOrderStatus,
} from "../../Helper/RestaurantHelper";

export const RestaurantOrders = () => {
  const [orders, setOrders] = useState([]);

  const { restaurantId } = useParams();

  let getOrders = async () => {
    try {
      const response = await restaurantOrders(restaurantId);
      setOrders(response.data.orders);
    } catch (error) {}
  };

  let orderStatus = async (orderId) => {
    try {
      let status = orders.find((o) => o.orderId === orderId).status;
      await updateOrderStatus(orderId, status);
      getOrders();
    } catch (error) {}
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Customer Name</th>
            <th>Restaurant Name</th>
            <th>Total Amount</th>
            <th>Order Status</th>
            <th>Payment Status</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.customerName}</td>
              <td>{order.restaurantname}</td>
              <td>{order.totalAmount}</td>
              <td>{order.status}</td>
              <td>{order.paymentStatus}</td>
              <td>
                <button onClick={() => orderStatus(order.orderId)}>
                  Update Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
