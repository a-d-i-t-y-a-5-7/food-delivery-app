import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import AddressFormModal from "../../Components/Address/AddressFormModal";
import { deleteAddress, fetchAddresses } from "../../Helper/AddressHelper";
import { placeOrder } from "../../Helper/OrderHelper";
import {
  decrementQuantity,
  incrementQuantity,
} from "../../Redux/Slices/cartSlice";

export const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
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
  }, [addresses]);

  const handleAdd = () => {
    setCurrentAddress(null);
    setIsModalVisible(true);
  };

  const handleUpdate = (address) => {
    setCurrentAddress(address);
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
  const handleAddressSave = (updatedAddress) => {
    if (currentAddress) {
      setAddresses(
        addresses.map((address) =>
          address.id === currentAddress.id
            ? { ...address, ...updatedAddress }
            : address
        )
      );
    } else {
      setAddresses([...addresses, updatedAddress]);
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

  const handleIncrementQuantity = (item) => {
    if (item.quantityInCart < item.availableQuantity) {
      dispatch(incrementQuantity(item.id));
    } else {
      toast.error(
        `Out of stock: Only ${item.availableQuantity} items are available.`
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
  const handleApplyCoupon = async () => {
    toast.success("Applied");
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
                      >
                        <EditOutlined />
                      </button>
                      <button
                        className="btn btn-outline-danger mx-2"
                        onClick={() => handleDelete(address.id)}
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
          <div
            className="card p-4 shadow-lg rounded"
            style={{
              marginTop: "60px",
              backgroundColor: "#f8f9fa",
            }}
          >
            <h5 className="text-center text-primary mb-4">Your Order</h5>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between align-items-center mb-3 p-3 border rounded bg-light"
                >
                  <span className="font-weight-bold">{item.name}</span>
                  <div className="d-flex align-items-center gap-3">
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
                  <span className="font-weight-bold">
                    ₹{item.price * item.quantityInCart}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-muted">No items in your cart</p>
            )}
            <hr />
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6>Total:</h6>
              <h6 className="font-weight-bold">
                ₹
                {cartItems.reduce(
                  (total, item) => total + item.price * item.quantityInCart,
                  0
                )}
              </h6>
            </div>

            <div className="mb-4">
              <label htmlFor="couponCode" className="form-label">
                Apply Coupon
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="couponCode"
                  className="form-control"
                  placeholder="Enter coupon code"
                />
                 <div className="input-group-append">
                    <button className="btn btn-success" onClick={handleApplyCoupon}>
                      Apply
                    </button>
                  </div>
              </div>
            </div>

            {cartItems.length > 0 && (
              <div className="text-center">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <AddressFormModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        currentAddress={currentAddress}
        userId={userId}
        onAddressSave={handleAddressSave}
      />
    </div>
  );
};




 

