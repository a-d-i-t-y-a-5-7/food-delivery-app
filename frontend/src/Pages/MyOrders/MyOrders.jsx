import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { OrderCard } from "../../Components/Profile/OrderCard";
import { userOrders } from "../../Helper/OrderHelper";

export const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const userId = useSelector((state) => state.auth.userId);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (userId) {
          const response = await userOrders(userId);
          const fetchedOrders = response.data.orders;
          const sortedOrders = fetchedOrders.sort(
            (a, b) => b.orderId - a.orderId
          );
          setOrders(sortedOrders);
        }
      } catch (error) {}
    };
    fetchOrders();
  }, [userId]);

  return (
    <div className="container" style={{ padding: "20px" }}>
      <h2 className="text-left mb-4">Your Orders</h2>
      <div className="row">
        {orders.map((order) => (
          <div key={order.orderId} className="col-md-6 mb-4">
            <OrderCard
              order={order}
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
