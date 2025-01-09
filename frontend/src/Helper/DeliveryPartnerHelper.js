import AxiosInstance from "./AxiosInstance";

export const fetchMyAssignedOrders = async (deliveryPartnerId) => {
  try {
    const response = await AxiosInstance.get(
      `/DeliveryPartner/${deliveryPartnerId}/orders`,
      {
        headers: {
          "Include-Authorization": true,
        },
      },
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
