import React, { useEffect, useState } from 'react';
import { Button,message, Modal, Form, Input} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchAddresses, addAddress, updateAddress, deleteAddress } from '../../Helper/AddressHelper';

const Address = () => {
    const [addresses, setAddresses] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentAddress, setCurrentAddress] = useState(null);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        const loadAddresses = async () => {
            try {
                const addressData = await fetchAddresses(2, 'USER');
                setAddresses(addressData);
            } catch (error) {
                message.error(error.message);
            }
        };
        loadAddresses();
    }, []);

    const handleAdd = () => {
        setCurrentAddress(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleUpdate = (address) => {
        setCurrentAddress(address);
        form.setFieldsValue({
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            country: address.country,
        });
        setIsModalVisible(true);
    };

    const handleDelete = async (addressId) => {
        try {
            await deleteAddress(addressId);
            setAddresses(addresses.filter(address => address.id !== addressId));
            message.success('Address deleted successfully.');
        } catch (error) {
            message.error(error.message);
        }
    };

    const handleDeliverHere = (addressId) => {
        setSelectedAddressId(addressId);
        const selectedAddress = addresses.find((address) => address.id === addressId);
        message.success(`Selected delivery address: ${selectedAddress.addressLine1}, ${selectedAddress.city}`);
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
                        address.id === currentAddress.id ? { ...address, ...values } : address
                    )
                );
                message.success('Address updated successfully.');
            } else {
                const newAddress = await addAddress({ entityId: 2, entityType: 'USER', ...values });
                setAddresses([...addresses, newAddress]);
                message.success('Address added successfully.');
            }
        } catch (error) {
            message.error(error.message);
        }
        setIsModalVisible(false);
    };

    return (
        <div className="container " style={{padding: "20px", flexDirection: "column"}}>
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
                background: 
                "white",
                    //"linear-gradient(to right, rgb(235, 87, 87), rgb(0, 0, 0))",
                  
                color: 
                "black", 
                 //"white",
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
            <div className="col-md-4" >
                <div className="card p-3" style={{ marginTop: "60px" }}>
                    <h5>Offers</h5>
                        <div className="d-flex justify-content-between align-items-center">
                            <img src="https://img.pikbest.com/origin/09/07/51/74NpIkbEsTIXv.jpg!bw700" style={{width:"100%",height:"400px"}} alt="offer" />
                        </div>
                        <div className="text-center mt-2">
                            <button className="btn btn-primary mt-2" > Order Now</button>
                        </div>
                    
                </div>
            </div>
            </div>
            <Modal
                title={currentAddress ? "Update Address" : "Add New Address"}
                open={isModalVisible}
                onCancel={handleModalCancel}
                footer={null}
                width={300}
            >
                <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                    <Form.Item
                        label="Address Line 1"
                        name="addressLine1"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Address Line 2" name="addressLine2">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="City"
                        name="city"
                        rules={[{ required: true, message: 'Please input your city!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="State"
                        name="state"
                        rules={[{ required: true, message: 'Please input your state!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Zip Code"
                        name="zipCode"
                        rules={[{ required: true, message: 'Please input your zip code!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Country"
                        name="country"
                        rules={[{ required: true, message: 'Please input your country!' }]}
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

export default Address;
