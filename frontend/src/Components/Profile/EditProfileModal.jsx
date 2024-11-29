import React from "react";
import { Modal, Input } from "antd";

export const EditProfileModal = ({ visible, onSave, onCancel, userData }) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  React.useEffect(() => {
    if (userData) {
      setName(userData.name);
      setEmail(userData.email);
      setPhoneNumber(userData.phoneNumber);
    }
  }, [userData]);

  const handleSave = () => {
    const updatedData = { name, email, phoneNumber };
    onSave(updatedData);
  };

  return (
    <Modal
      title="Edit Profile"
      open={visible}
      onOk={handleSave}
      onCancel={onCancel}
      okText="Save"
      cancelText="Cancel"
    >
      <div style={{ marginBottom: "16px" }}>
        <label>Name:</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <label>Email:</label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label>Phone:</label>
        <Input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
        />
      </div>
    </Modal>
  );
};
