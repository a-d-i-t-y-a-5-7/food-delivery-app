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
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const data = await getUserById(userId);
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
          const updatedData = {};
          for (const key in values) {
            if (values[key] !== user[key]) {
              updatedData[key] = values[key];
            }
          }
          if (Object.keys(updatedData).length > 0) {
            try {
              const response = await updateUser(userId, updatedData);
              setUser((prevUser) => ({ ...prevUser, ...updatedData }));
            } catch (error) {
              console.error("Error updating user:", error);
            }
          } else {
            console.log("No changes detected.");
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
          <Avatar
            size={150}
            src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Pic.png"
          />
        </div>
        <div className="details">
          <Form
            form={form}
            layout="vertical"
            initialValues={user}
            disabled={!isEditing}
          >
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Phone" name="phoneNumber">
              <Input />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
