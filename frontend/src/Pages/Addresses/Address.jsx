import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal} from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  addAddress,
  deleteAddress,
  fetchAddresses,
  updateAddress,
} from "../../Helper/AddressHelper";
import { incrementQuantity, decrementQuantity } from "../../Redux/Slices/cartSlice";
import { placeOrder } from "../../Helper/OrderHelper";

export const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [form] = Form.useForm();

  const userId = useSelector((state) => state.auth.userId);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const addressData = await fetchAddresses(userId, "USER");
        console.log(addressData);
        setAddresses(addressData);
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (userId) {
      loadAddresses();
    }
  }, [userId]);

  const handleAdd = () => {
    setCurrentAddress(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleUpdate = (address) => {
    setCurrentAddress(address);
    form.setFieldsValue(address);
    setIsModalVisible(true);
  };

  const handleDelete = async (addressId) => {
    try {
      await deleteAddress(addressId);
      setAddresses(addresses.filter((address) => address.id !== addressId));
      toast.success("Address deleted successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeliverHere = (addressId) => {
    setSelectedAddressId(addressId);
    const selectedAddress = addresses.find(
      (address) => address.id === addressId
    );
    toast.success(
      `Selected delivery address: ${selectedAddress.addressLine1}, ${selectedAddress.city}`
    );
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setCurrentAddress(null);
  };

  const handleFormSubmit = async (values) => {
    try {
      if (currentAddress) {
        await updateAddress(currentAddress.id, values);
        setAddresses(
          addresses.map((address) =>
            address.id === currentAddress.id
              ? { ...address, ...values }
              : address
          )
        );
        toast.success("Address updated successfully.");
      } else {
        const newAddress = await addAddress({
          entityId: userId,
          entityType: "USER",
          ...values,
        });
        setAddresses([...addresses, newAddress]);
        toast.success("Address added successfully.");
      }
    } catch (error) {
      toast.error(error.message);
    }
    setIsModalVisible(false);
  };
  const handleIncrementQuantity = (item) => {
    if (item.quantityInCart < item.availableQuantity) {
      dispatch(incrementQuantity(item.id));
    } else {
      toast.error(`Out of stock: Only ${item.availableQuantity} items are available.`);
    }
  };
  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.warning("Please select a delivery address.");
      return;
    }

    const orderData = {
      customerId: userId,
      restaurantId: 1, 
      addressId: selectedAddressId,
      orderItems: cartItems.map((item) => ({ 
        foodItemId: item.id, 
        quantity: item.quantityInCart,
      })),
    };

    try {
      const response = await placeOrder(orderData);
      toast.success(`Order placed successfully! Order ID: ${response.orderId}`);
      console.log("Placed order",response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="container "
      style={{ padding: "20px", flexDirection: "column" }}
    >
      <div className="row">
        <div className="col-md-8">
          <h2 className="text-left mb-4">Select a Delivery Address</h2>
           <div className="row">
            {addresses.map((address) => (
              <div className="col-12 col-md-6 mb-4" key={address.id}>
                <div
                  className="card h-100 shadow-sm"
                  style={{
                    width: "100%",
                    maxWidth: "450px",
                    margin: "auto",
                    background: "white",
                    color: "black",
                  }}
                >
                  <div className="card-header bg-transparent d-flex justify-content-between align-items-center">
                    <span>
                      {address.city}, {address.state}
                    </span>
                    <input
                      type="radio"
                      name="deliveryAddress"
                      checked={selectedAddressId === address.id}
                      onChange={() => handleDeliverHere(address.id)}
                      className="form-check-input"
                    />
                  </div>
                  <div className="card-body">
                    <p>
                      <strong>Street:</strong> {address.addressLine1},{" "}
                      {address.addressLine2}
                    </p>
                    <p>
                      <strong>Zip Code:</strong> {address.zipCode}
                    </p>
                    <p>
                      <strong>Country:</strong> {address.country}
                    </p>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-outline-success mx-2"
                        onClick={() => handleUpdate(address)}
                        style={{
                          padding: "0.5rem 1rem",
                          borderRadius: "5px",
                          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        <EditOutlined />
                      </button>
                      <button
                        className="btn btn-outline-danger mx-2"
                        onClick={() => handleDelete(address.id)}
                        style={{
                          padding: "0.5rem 1rem",
                          borderRadius: "5px",
                          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        <DeleteOutlined />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <Button type="primary" onClick={handleAdd}>
              Add New Address
            </Button>
          </div>
        </div>
        <div className="col-md-4">
        <div className="card p-3" style={{ marginTop: "60px" }}>
          <h5>Your Order</h5>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between align-items-center mb-2"
              >
                <span>{item.name} </span>
                <span>
                <div className="d-flex align-items-center gap-3 mt-2">
                <button className="btn btn-outline-danger btn-sm"
                  onClick={() => dispatch(decrementQuantity(item.id))}
                >-</button>
                <span>{item.quantityInCart}</span>
                <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleIncrementQuantity(item)}
                >
                +
                </button> 
                </div></span>
                <span>₹{item.price * item.quantityInCart}</span>
              </div>
            ))
          ) : (
            <p>No items in your cart</p>
          )}
          <hr />
          <div className="d-flex justify-content-between">
            <h6>Total:</h6>
            <h6>₹{cartItems.reduce((total, item) => total + item.price * item.quantityInCart, 0)}</h6>
          </div>
          <div className="text-center mt-2">
            <button className="btn btn-primary mt-2" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
        </div>

      </div>
      <Modal
        title={currentAddress ? "Update Address" : "Add New Address"}
        open={isModalVisible}
        onCancel={handleModalCancel}
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
    </div>
  );
};
