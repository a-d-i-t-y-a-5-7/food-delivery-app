import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userOrders } from "../../Helper/OrderHelper";
import "bootstrap/dist/css/bootstrap.min.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const userId = useSelector((state) => state.auth.userId);
  const cartItems = useSelector((state) => state.cart.items);

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
      <div className="row">
                {orders.map((order) => (
                  <div key={order.orderId} className="col-md-6 mb-2">
                    <div className="card" style={{ borderRadius: "10px", overflow: "hidden" }}>
                      <div className="d-flex">
                        <div className="container p-3 d-flex align-items-center">
                          <div className="ms-3">
                            <h5>{order.restaurantname}</h5>
                            <div className="mt-2">
                              <p className="text-muted">
                                Total: ₹{order.totalAmount}
                              </p>
                              <p className="text-muted">
                                Order Status: ₹{order.status}
                              </p>
                              <p className="text-muted">
                                Payment Status: ₹{order.paymentStatus}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
        </div>
        </div>
  )
  };
  

export default MyOrders;
