import AxiosInstance from "./AxiosInstance";

export const fetchAddresses = async (userId, role) => {
  try {
    const response = await AxiosInstance.get(`User/get-address`, {
      params: { userId, role },
    });
    return response.data;
    
  } catch (error) {
   
    throw new Error(error.response.data.message || 'Internal Server Error');
  }
};

export const addAddress = async (addressData) => {
  try {
    const response = await AxiosInstance.post(`User/add-address`, addressData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add address.');
  }
};

export const updateAddress = async (addressId, addressData) => {
  try {
    await AxiosInstance.put(`User/update-address/${addressId}`, addressData);
  } catch (error) {
    throw new Error('Failed to update address.');
  }
};

export const deleteAddress = async (addressId) => {
  try {
    await AxiosInstance.delete(`User/delete-Address/${addressId}`);
  } catch (error) {
    throw new Error('Failed to delete address.');
  }
};
