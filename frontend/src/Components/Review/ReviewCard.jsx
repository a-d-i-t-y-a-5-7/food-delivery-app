import { Rate } from "antd";
import React from "react";

export const ReviewCard = ({ rating, comment }) => {
  return (
    <div className="review-card border rounded p-3 m-2 shadow-sm ">
      <p className="mb-3">{comment}</p>
      <div className="d-flex align-items-center mb-2">
        <Rate value={rating} disabled style={{ fontSize: 18 }} />
      </div>
    </div>
  );
};
