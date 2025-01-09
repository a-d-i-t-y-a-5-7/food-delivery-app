import AxiosInstance from "./AxiosInstance";

export const userOrders = async (userId) => {
  try {
    const response = await AxiosInstance.get(`/Order/get-orders/${userId}`, {
      headers: {
        "Include-Authorization": true,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Orders not found");
  }
};

export const fetchAllOrders = async () => {
  try {
    const response = await AxiosInstance.get(`/Order`, {
      headers: {
        "Include-Authorization": true,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch Orders.");
  }
};

export const placeOrder = async (orderData) => {
  try {
    const response = await AxiosInstance.post(`/Order/place-order`, orderData, {
      headers: {
        "Include-Authorization": true,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to place the order. Please check the order data.");
  }
};
