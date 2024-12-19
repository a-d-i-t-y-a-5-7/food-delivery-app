import { Button, Input, Modal, Rate, Select } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { AddReview } from "../../Helper/ProfileHelper";

const { TextArea } = Input;
const { Option } = Select;

const ReviewModal = ({ isModalVisible, setIsModalVisible, orderId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewType, setReviewType] = useState("");

  const handleCloseModal = () => {
    setIsModalVisible(false);
    clearFields();
  };

  const handleAddReview = async () => {
    if (!rating || !comment || !reviewType) {
      alert("Please fill all fields!");
      return;
    }
    try {
      await AddReview({
        orderId,
        rating,
        comment,
        reviewType,
      });
      toast.success("Review Added");
    } catch (error) {}
    handleCloseModal();
  };

  const clearFields = () => {
    setRating(0);
    setComment("");
    setReviewType("");
  };

  return (
    <div>
      <Modal
        title="Add Review"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <div>
          <label>Rating:</label>
          <Rate onChange={setRating} value={rating} />
        </div>

        <div style={{ marginTop: 16 }}>
          <label>Comment:</label>
          <TextArea
            rows={4}
            placeholder="Write your review here..."
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
        </div>

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
