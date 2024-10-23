import React, { useEffect, useState } from 'react';
import { Button, Card, Typography, message, Row, Col, Popconfirm, Modal, Form, Input } from 'antd';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Address = () => {
    const [addresses, setAddresses] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentAddress, setCurrentAddress] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios.get(`https://localhost:44357/api/User/get-address`, {
                    params: {
                        userId: 2, 
                        role: 'USER' 
                    }
                });
                setAddresses(response.data);
            } catch (error) {
                message.error('Failed to fetch addresses.');
            }
        };
        fetchAddresses();
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
            await axios.delete(`https://localhost:44357/api/User/delete-Address/${addressId}`);
            setAddresses(addresses.filter(address => address.id !== addressId));
            message.success('Address deleted successfully.');
        } catch (error) {
            console.error('Delete error:', error.response ? error.response.data : error.message);
            message.error('Failed to delete address.');
        }
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setCurrentAddress(null);
    };

    const handleFormSubmit = async (values) => {
        if (currentAddress) {
            // Update existing address
            try {
                await axios.put(`https://localhost:44357/api/User/update-address/${currentAddress.id}`, values);
                
                setAddresses(
                    addresses.map((address) =>
                        address.id === currentAddress.id ? { ...address, ...values } : address
                    )
                );
                message.success('Address updated successfully.');
            } catch (error) {
                message.error('Failed to update address.');
            }
        } else {
            // Add new address
            try {
                const response = await axios.post('https://localhost:44357/api/User/add-address', {
                    entityId: 2,  
                    entityType: 'USER', 
                    ...values, 
                   
                });
                              
                setAddresses([...addresses, response.data]); 
                message.success('Address added successfully.');
            } catch (error) {
                message.error('Failed to add address.');
            }
        }
    
        setIsModalVisible(false);
    };

    return (
        <div className="container mt-4">
            <Typography.Title level={2}>Saved Addresses</Typography.Title>
            <Button type="primary" onClick={handleAdd} style={{ marginBottom: '20px', marginLeft: '90%' }}>
                Add New Address
            </Button>
            
            <Row gutter={[16, 16]}>
                {addresses.map((address) => (
                    <Col key={address.id} xs={24} sm={12} md={8}>
                        <Card
                            title={`${address.city}, ${address.state}`}
                            bordered={false}
                            style={{ borderRadius: '10px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
                            actions={[
                                <Button onClick={() => handleUpdate(address)} type="primary">Update</Button>,
                                <Popconfirm
                                    title="Are you sure you want to delete this address?"
                                    onConfirm={() => handleDelete(address.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button danger>Delete</Button>
                                </Popconfirm>
                                
                            ]}
                        >
                            <p><strong>Street:</strong> {address.addressLine1}, {address.addressLine2}</p>
                            <p><strong>City:</strong> {address.city}</p>
                            <p><strong>State:</strong> {address.state}</p>
                            <p><strong>Zip Code:</strong> {address.zipCode}</p>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal
                title={currentAddress ? "Update Address" : "Add New Address"}
                open={isModalVisible}
                onCancel={handleModalCancel}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                    <Form.Item
                        label="Address Line 1"
                        name="addressLine1"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Address Line 2"
                        name="addressLine2"
                    >
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
                        <Button type="primary" htmlType="submit">
                            {currentAddress ? "Update" : "Add"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Address;
