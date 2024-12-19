import { Rate } from "antd";
import React from "react";
import "./Review.css";

export const ReviewCard = ({ rating, comment, orderId }) => {
  return (
    <div className="review-card shadow-sm">
      <p>Order Id: {orderId}</p>
      <p className="mb-3 fw-bold">{comment}</p>
      <div className="d-flex align-items-center mb-2">
        <Rate value={rating} disabled style={{ fontSize: 18 }} />
      </div>
    </div>
  );
};
