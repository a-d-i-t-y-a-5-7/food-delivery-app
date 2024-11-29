import { Avatar, Button, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserById, updateUser } from "../../Helper/ProfileHelper";
import "./ViewProfile.css";
import { EditProfileModal } from "../../Components/Profile/EditProfileModal";

export const ViewProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { userId } = useSelector((state) => state.auth);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

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
        return <div>My Addresses content goes here...</div>;
      case "orders":
        return <div>My Orders content goes here...</div>;
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
