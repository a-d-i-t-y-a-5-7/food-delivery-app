import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchMyAssignedOrders } from "../../Helper/DeliveryPartnerHelper";

export const DeliveryPartnerAssignedOrders = () => {
  const deliveryPartnerId = useSelector((state) => state.auth.userId);

  const [myAssignedOrders, setMyAssignedOrders] = useState([]);

  const getMyAssignedOrders = async () => {
    const response = await fetchMyAssignedOrders(deliveryPartnerId);
    setMyAssignedOrders(response.data.orders);
  };

  useEffect(() => {
    getMyAssignedOrders();
  }, []);

  return (
    <div>
      {myAssignedOrders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Customer Name</th>
              <th>Restaurant Name</th>
              <th>Total Amount</th>
              <th>Order Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myAssignedOrders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.customerName}</td>
                <td>{order.restaurantName}</td>
                <td>{order.totalAmount}</td>
                <td>{order.status}</td>
                {order.status === "Pending" ? (
                  <td>
                    <button>Accept</button>
                    <button>Reject</button>
                  </td>
                ) : (
                  ""
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="p-3 text-center">No Assigned Orders Found</p>
      )}
    </div>
  );
};
