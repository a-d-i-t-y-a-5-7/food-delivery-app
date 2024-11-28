import AxiosInstance from "./AxiosInstance";
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