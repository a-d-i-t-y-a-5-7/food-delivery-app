import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userOrders } from "../../Helper/OrderHelper";
import "bootstrap/dist/css/bootstrap.min.css";

export const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const userId = useSelector((state) => state.auth.userId);

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
      } catch (error) {
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
            <div
              className="card"
              style={{ borderRadius: "10px", overflow: "hidden" }}
            >
              <div className="p-3">
                <h5>{order.restaurantname}</h5>

                <div className="d-flex justify-content-between mb-2">
                  <div>
                    <p className="mb-1">Order ID: {order.orderId}</p>
                  </div>
                  <div>
                    <p className="mb-1">Order Status: {order.status}</p>
                  </div>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <div>
                    <p className="mb-1">
                      <strong>Total Price:₹{order.totalAmount}</strong>
                    </p>
                  </div>
                  <div>
                    <p className="mb-1">
                      Payment Status: {order.paymentStatus}
                    </p>
                  </div>
                </div>
                <div>
                  {order.orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between align-items-center mt-3"
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src={item.foodItemImageUrl}
                          alt={item.foodItemName}
                          style={{
                            width: "80px",
                            height: "60px",
                            borderRadius: "8px",
                            marginRight: "10px",
                          }}
                        />
                        <div>
                          <p className="mb-1">
                            <strong>
                              {item.foodItemName} x {item.quantity} Price: ₹
                              {item.price}{" "}
                            </strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-end mt-3">
                  <button
                    className="btn btn-primary"
                    //onClick={ () => handleReview()}
                  >
                    Add Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
