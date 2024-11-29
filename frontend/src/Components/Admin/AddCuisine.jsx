import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";

export const AddCuisine = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(true);

  const onClose = () => {
    setModalVisible(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        form.resetFields();
      })
      .catch((info) => {
        console.error("Validation Failed:", info);
      });
  };

  return (
    <Modal
      title="Add New Cuisine"
      open={modalVisible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Add Cuisine
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="cuisineForm">
        <Form.Item
          label="Cuisine Name"
          name="name"
          rules={[
            { required: true, message: "Please enter the cuisine name!" },
          ]}
        >
          <Input placeholder="Enter cuisine name" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
