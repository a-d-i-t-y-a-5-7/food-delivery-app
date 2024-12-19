import React, { useEffect } from "react";
import { Button, Form, Input, Modal } from "antd";
import { toast } from "react-toastify";
import { addAddress, updateAddress } from "../../Helper/AddressHelper";

const AddressFormModal = ({ isVisible, onClose, currentAddress, userId, onAddressSave }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentAddress) {
      form.setFieldsValue(currentAddress);
    } else {
      form.resetFields();
    }
  }, [currentAddress, form]);

  const handleFormSubmit = async (values) => {
    try {
      let updatedAddress;
      if (currentAddress) {
        updatedAddress = await updateAddress(currentAddress.id, values);
        toast.success("Address updated successfully.");
      } else {
        updatedAddress = await addAddress({
          entityId: userId,
          entityType: "USER",
          ...values,
        });
        toast.success("Address added successfully.");
      }
      onAddressSave(updatedAddress);
      
    } catch (error) {
      toast.error(error.message);
    }
    onClose();
  };

  return (
    <Modal
      title={currentAddress ? "Update Address" : "Add New Address"}
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={400}
    >
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item
          label="Address Line 1"
          name="addressLine1"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Address Line 2" name="addressLine2">
          <Input />
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: "Please input your city!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="State"
          name="state"
          rules={[{ required: true, message: "Please input your state!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Zip Code"
          name="zipCode"
          rules={[{ required: true, message: "Please input your zip code!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Country"
          name="country"
          rules={[{ required: true, message: "Please input your country!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {currentAddress ? "Update" : "Add"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddressFormModal;
