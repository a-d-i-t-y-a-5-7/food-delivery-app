import { Avatar, Button, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AddressCard } from "../../Components/Profile/AddressCard";
import { EditProfileModal } from "../../Components/Profile/EditProfileModal";
import { OrderCard } from "../../Components/Profile/OrderCard";
import { ReviewCard } from "../../Components/Review/ReviewCard";
import { fetchAddresses } from "../../Helper/AddressHelper";
import { userOrders } from "../../Helper/OrderHelper";
import {
  getReviewById,
  getUserById,
  updateUser,
} from "../../Helper/ProfileHelper";
import "./ViewProfile.css";

export const ViewProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orders, setOrders] = useState([]);
  const { userId } = useSelector((state) => state.auth);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const GetReviews = async () => {
    try {
      const reviewData = await getReviewById(userId);
      setReviews(reviewData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const loadAddresses = async () => {
    try {
      const addressData = await fetchAddresses(userId, "USER");
      setAddresses(addressData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchOrders = async () => {
    try {
      if (userId) {
        const response = await userOrders(userId);
        const fetchedOrders = response.data.orders;
        const sortedOrders = fetchedOrders.sort(
          (a, b) => b.orderId - a.orderId,
        );
        setOrders(sortedOrders);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const data = await getUserById(userId);
          setUser(data);
        } catch (error) {}
      }
    };

    fetchUser();
    loadAddresses();
    fetchOrders();
    GetReviews();
  }, [userId, reviews]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedData) => {
    try {
      await updateUser(userId, updatedData);
      setUser((prevUser) => ({ ...prevUser, ...updatedData }));
      setIsEditing(false);
    } catch (error) {}
  };

  const renderContent = (key) => {
    switch (key) {
      case "reviews":
        return (
          <div className="review-container">
            {reviews.length === 0 ? (
              <p>No Reviews found.</p>
            ) : (
              reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  rating={review.rating}
                  comment={review.comment}
                  orderId={review.orderId}
                />
              ))
            )}
          </div>
        );
      case "addresses":
        return (
          <div className="d-flex">
            {addresses.length === 0 ? (
              <p>No addresses found.</p>
            ) : (
              addresses.map((address) => (
                <AddressCard key={address.id} address={address} />
              ))
            )}
          </div>
        );
      case "orders":
        return (
          <div className="order-container m-3">
            {orders.length === 0 ? (
              <p>No Orders found.</p>
            ) : (
              orders.map((order) => (
                <div className="mb-4">
                  <OrderCard
                    key={order.id}
                    order={order}
                    isModalVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                  />
                </div>
              ))
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="banner">
        <div className="avatar">
          <Avatar
            size={150}
            src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Pic.png"
          />
        </div>
        <Button type="primary" onClick={handleEditClick} id="editButton">
          Edit Profile
        </Button>
      </div>
      <div className="profile-content">
        <div className="tabs-section">
          <Tabs defaultActiveKey="reviews">
            <TabPane tab="Reviews" key="reviews">
              {renderContent("reviews")}
            </TabPane>
            <TabPane tab="My Addresses" key="addresses">
              {renderContent("addresses")}
            </TabPane>
            <TabPane tab="My Orders" key="orders">
              {renderContent("orders")}
            </TabPane>
          </Tabs>
        </div>
      </div>

      <EditProfileModal
        visible={isEditing}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
        userData={user}
      />
    </div>
  );
};
