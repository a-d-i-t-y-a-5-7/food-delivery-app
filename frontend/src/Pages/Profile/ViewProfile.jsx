import { Avatar, Button, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AddressCard } from "../../Components/Profile/AddressCard";
import { EditProfileModal } from "../../Components/Profile/EditProfileModal";
import { fetchAddresses } from "../../Helper/AddressHelper";
import { getUserById, updateUser } from "../../Helper/ProfileHelper";
import "./ViewProfile.css";
import { OrderCard } from "../../Components/Profile/OrderCard";
import { userOrders } from "../../Helper/OrderHelper";

export const ViewProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orders, setOrders] = useState([]);
  const { userId } = useSelector((state) => state.auth);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const handleReview = () => {
    setIsModalVisible(true);
  };

  const loadAddresses = async () => {
    try {
      const addressData = await fetchAddresses(userId, "USER");
      console.log(addressData);
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
        console.log(sortedOrders);
        setOrders(sortedOrders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const data = await getUserById(userId);
          setUser(data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
    loadAddresses();
    fetchOrders();
  }, [userId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedData) => {
    try {
      await updateUser(userId, updatedData);
      setUser((prevUser) => ({ ...prevUser, ...updatedData }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const renderContent = (key) => {
    switch (key) {
      case "reviews":
        return <div>Reviews content goes here...</div>;
      case "addresses":
        return (
          <div className="d-flex align-items-start">
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
          <div className="row m-3">
            {orders.length === 0 ? (
              <p>No Orders found.</p>
            ) : (
              orders.map((order) => (
                <div className="col-md-6 mb-4">
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
