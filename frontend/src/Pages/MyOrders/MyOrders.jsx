import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userOrders } from "../../Helper/OrderHelper";
import "bootstrap/dist/css/bootstrap.min.css";

const myOrders = () => {
  const [orders, setOrders] = useState([]);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (userId) {
          const response = await userOrders(userId);
          setOrders(response.data.orders); 
          toast.success("Orders fetched successfully");
        }
      } catch (error) {
        toast.error("Failed to fetch orders");
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [userId]);

  return (
    <div className="container" style={{ padding: "20px" }}>
      <h2 className="text-left mb-4">Your Orders</h2>
      {orders.length > 0 ? (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Restaurant Name</th>
                <th>Total Amount</th>
                <th>Order Status</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.customerName}</td>
                  <td>{order.restaurantname}</td>
                  <td>₹{order.totalAmount}</td>
                  <td>{order.status}</td>
                  <td>{order.paymentStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default myOrders;
