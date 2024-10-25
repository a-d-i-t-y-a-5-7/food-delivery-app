import axios from 'axios';
const BASE_URL = 'https://localhost:44357/api/User';

export const fetchAddresses = async (userId, role) => {
  try {
    const response = await axios.get(`${BASE_URL}/get-address`, {
      params: { userId, role },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch addresses.');
  }
};

export const addAddress = async (addressData) => {
  try {
    const response = await axios.post(`${BASE_URL}/add-address`, addressData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add address.');
  }
};

export const updateAddress = async (addressId, addressData) => {
  try {
    await axios.put(`${BASE_URL}/update-address/${addressId}`, addressData);
  } catch (error) {
    throw new Error('Failed to update address.');
  }
};

export const deleteAddress = async (addressId) => {
  try {
    await axios.delete(`${BASE_URL}/delete-Address/${addressId}`);
  } catch (error) {
    throw new Error('Failed to delete address.');
  }
};
