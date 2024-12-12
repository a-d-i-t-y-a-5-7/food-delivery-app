import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  addAddress,
  deleteAddress,
  fetchAddresses,
  updateAddress,
} from "../../Helper/AddressHelper";
import {
  incrementQuantity,
  decrementQuantity,
} from "../../Redux/Slices/cartSlice";
import { placeOrder } from "../../Helper/OrderHelper";
import { AddressCard } from "../../Components/Profile/AddressCard";

export const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [form] = Form.useForm();
  const userId = useSelector((state) => state.auth.userId);
  const cartItems = useSelector((state) => state.cart.items);
  const restaurantId = useSelector((state) => state.cart.restaurantId);

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
      (address) => address.id === addressId,
    );
    toast.success(
      `Selected delivery address: ${selectedAddress.addressLine1}, ${selectedAddress.city}`,
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
              : address,
          ),
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
      toast.error(
        `Out of stock: Only ${item.availableQuantity} items are available.`,
      );
    }
  };
  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.warning("Please select a delivery address.");
      return;
    }
    const orderData = {
      customerId: userId,
      restaurantId: restaurantId,
      addressId: selectedAddressId,
      orderItems: cartItems.map((item) => ({
        foodItemId: item.id,
        quantity: item.quantityInCart,
      })),
    };

    try {
      const response = await placeOrder(orderData);
      Swal.fire({
        title: "Order Placed!",
        text: `Your order has been successfully placed. Order ID: ${response.orderId}`,
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          popup: "colored-toast",
        },
      });
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
                <AddressCard
                  address={address}
                  selectedAddressId={selectedAddressId}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  onSelect={handleDeliverHere}
                />
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
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => dispatch(decrementQuantity(item.id))}
                      >
                        -
                      </button>
                      <span>{item.quantityInCart}</span>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleIncrementQuantity(item)}
                      >
                        +
                      </button>
                    </div>
                  </span>
                  <span>₹{item.price * item.quantityInCart}</span>
                </div>
              ))
            ) : (
              <p>No items in your cart</p>
            )}
            <hr />
            <div className="d-flex justify-content-between">
              <h6>Total:</h6>
              <h6>
                ₹
                {cartItems.reduce(
                  (total, item) => total + item.price * item.quantityInCart,
                  0,
                )}
              </h6>
            </div>
            {cartItems.length > 0 && (
              <div className="text-center mt-2">
                <button
                  className="btn btn-primary mt-2"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              </div>
            )}
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
