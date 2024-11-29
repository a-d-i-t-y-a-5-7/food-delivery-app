import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userOrders } from "../../Helper/OrderHelper";
import { getMenuItemList } from "../../Helper/MenuItem"; 
import "bootstrap/dist/css/bootstrap.min.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (userId) {
          const response = await userOrders(userId);
          const fetchedOrders = response.data.orders;
          const updatedOrders = await Promise.all(
            fetchedOrders.map(async (order) => {
              const updatedOrderItems = await Promise.all(
                order.orderItems.map(async (item) => {
                  try {
                    const foodItemResponse = await getMenuItemList(item.foodItemId);
                    return {
                      ...item,
                      name: foodItemResponse.data.name,
                      image: foodItemResponse.data.imageUrl, 
                      price: foodItemResponse.data.price,
                    };
                  } catch (error) {
                    console.error("Error fetching food item:", error);
                    return item; 
                  }
                })
              );

              return {
                ...order,
                orderItems: updatedOrderItems,
              };
            })
          );
          const sortedOrders = updatedOrders.sort((a, b) => b.orderId - a.orderId);
          setOrders(sortedOrders);
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
      <div className="row">
        {orders.map((order) => (
          <div key={order.orderId} className="col-md-10 mb-4">
            <div className="card" style={{ borderRadius: "10px", overflow: "hidden" }}>
              <div className="d-flex align-items-start" style={{ padding: "15px" }}>
                <div className="p-3">
                  <img
                    src={order.orderItems[0]?.image} 
                    alt={order.orderItems[0]?.name} 
                    style={{
                      width: "150px",
                      height: "100px",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div className="container p-3" style={{ flex: 1 }}>
                  <div className="d-flex justify-content-between">
                    <h5>{order.restaurantname}</h5>
                    <span className="text-muted">{new Date(order.deliveredAt).toLocaleString()}</span>
                  </div>

                  <div className="d-flex justify-content-between mt-2">
                    <p className="text-muted mb-0">Order ID: {order.orderId}</p>
                    <p className="text-muted mb-0">Order Status: {order.status}</p>
                  </div>

                  <div className="d-flex justify-content-between mt-2">
                    <p className="text-muted mb-0">Total: ₹{order.totalAmount}</p>
                    <p className="text-muted mb-0">Payment Status: {order.paymentStatus}</p>
                  </div>
                </div>
              </div>
              <hr />

              <div className="container p-3">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <p><strong>{item.name}</strong> x {item.quantity}</p>
                    </div>

                    <div>
                      <p>₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
