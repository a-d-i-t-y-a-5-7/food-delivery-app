import { Avatar, Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../../Helper/ProfileHelper";
import "./ViewProfile.css";

export const ViewProfile = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const { userId } = useParams();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    role: "user",
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const data = await getUserById(userId);
          console.log(data);
          setUser(data);
          form.setFieldsValue(data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [userId, form]);

  const handleEditClick = () => {
    if (isEditing) {
      form
        .validateFields()
        .then(async (values) => {
          console.log(values);
          try {
            const response = await updateUser(userId, values);
            console.log("Update Response:", response);
            setUser(values);
          } catch (error) {
            console.error("Error updating user:", error);
          }
          setIsEditing(false);
        })
        .catch((errorInfo) => {
          console.log("Validation Failed:", errorInfo);
        });
    } else {
      setIsEditing(true);
      form.setFieldsValue(user);
    }
  };

  return (
    <div className="p-3 d-flex justify-content-center">
      <div className="ProfileCard shadow-md">
        <Button type="primary" onClick={handleEditClick} id="editButton">
          {isEditing ? "Update" : "Edit"}
        </Button>
        <div className="avatar">
          <Avatar size={150} src={user.profilePicture} />
        </div>
        <div className="details">
          <Form
            form={form}
            layout="vertical"
            initialValues={user}
            disabled={!isEditing}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please select your role!" }]}
            >
              <Select placeholder="Select a role">
                <Select.Option value="user">User</Select.Option>
                <Select.Option value="delivery-partner">
                  Delivery Partner
                </Select.Option>
                <Select.Option value="restaurant-owner">
                  Restaurant Owner
                </Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
