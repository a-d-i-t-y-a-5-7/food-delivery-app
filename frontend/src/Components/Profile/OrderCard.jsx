import React from "react";
import ReviewModal from "../../Components/Review/ReviewModal";

export const OrderCard = ({ order, isModalVisible, setIsModalVisible }) => {
  const handleReview = () => {
    setIsModalVisible(true);
  };

  return (
    <div className="card shadow-sm p-3 mb-4 bg-white rounded">
      <div
        className="restaurant-header mb-3 p-2"
        style={{
          background: "linear-gradient(90deg, #ff7e5f, #feb47b)",
          borderRadius: "8px",
          color: "#fff",
        }}
      >
        <h5 className="mb-3">{order.restaurantname}</h5>
      </div>

      <div className="d-flex justify-content-between mb-2">
        <div>
          <p className="mb-1">
            <strong>Order ID:</strong> {order.orderId}
          </p>
        </div>
        <div>
          <p className="mb-1">
            <strong>Status:</strong> {order.status}
          </p>
        </div>
      </div>

      <div className="d-flex justify-content-between mb-3">
        <div>
          <p className="mb-1">
            <strong>Total Price:</strong> ₹{order.totalAmount}
          </p>
        </div>
        <div>
          <p className="mb-1">
            <strong>Payment:</strong> {order.paymentStatus}
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
                className="rounded"
                style={{
                  width: "80px",
                  height: "60px",
                  objectFit: "cover",
                  marginRight: "10px",
                }}
              />
              <div>
                <p className="mb-1">
                  <strong>
                    {item.foodItemName} x {item.quantity} = ₹{item.price}
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
          onClick={() => handleReview(order.orderId)}
        >
          Add Review
        </button>
      </div>

      <ReviewModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        orderId={order.orderId}
      />
    </div>
  );
};
