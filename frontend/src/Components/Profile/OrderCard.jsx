import React from "react";
import ReviewModal from "../../Components/Review/ReviewModal";

export const OrderCard = ({ order, isModalVisible, setIsModalVisible }) => {
  const handleReview = () => {
    setIsModalVisible(true);
  };
  return (
    <div className="p-3 card">
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
            <strong>Total Price: ₹{order.totalAmount}</strong>
          </p>
        </div>
        <div>
          <p className="mb-1">Payment Status: {order.paymentStatus}</p>
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
                    {item.foodItemName} x {item.quantity} Price: ₹{item.price}{" "}
                  </strong>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="text-end mt-3">
          <button className="btn btn-primary" onClick={() => handleReview()}>
            Add Review
          </button>
        </div>
        <ReviewModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      </div>
    </div>
  );
};
