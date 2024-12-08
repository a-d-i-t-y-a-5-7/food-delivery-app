import { Button, Input, Modal, Rate, Select } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const { TextArea } = Input;
const { Option } = Select;

const ReviewModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewType, setReviewType] = useState("");
  const { userId, role } = useSelector((state) => state.auth);
  console.log(userId, role);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    clearFields();
  };

  const handleAddReview = () => {
    if (!rating || !comment || !reviewType) {
      alert("Please fill all fields!");
      return;
    }

    const reviewData = { rating, comment, reviewType };
    console.log("Review Submitted: ", reviewData);
    handleCloseModal();
  };

  const clearFields = () => {
    setRating(0);
    setComment("");
    setReviewType("");
  };

  return (
    <div>
      <Button type="primary" onClick={handleOpenModal} className="m-auto">
        Add Review
      </Button>

      <Modal
        title="Add Review"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {/* Rating */}
        <div>
          <label>Rating:</label>
          <Rate onChange={setRating} value={rating} />
        </div>

        {/* Comment */}
        <div style={{ marginTop: 16 }}>
          <label>Comment:</label>
          <TextArea
            rows={4}
            placeholder="Write your review here..."
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
        </div>

        {/* Review Type */}
        <div style={{ marginTop: 16 }}>
          <label>Review Type:</label>
          <Select
            placeholder="Select review type"
            onChange={(value) => setReviewType(value)}
            value={reviewType}
            style={{ width: "100%" }}
          >
            <Option value="Restaurant">Restaurant</Option>
            <Option value="DeliveryPartner">Delivery Partner</Option>
          </Select>
        </div>

        {/* Submit Button */}
        <Button
          type="primary"
          style={{ marginTop: 20, width: "100%" }}
          onClick={handleAddReview}
        >
          Add Review
        </Button>
      </Modal>
    </div>
  );
};
export default ReviewModal;
