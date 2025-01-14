import AxiosInstance from "./AxiosInstance";

export const getRestaurantList = async (ownerId) => {
  try {
    const response = await AxiosInstance.get(
      `/Restaurant/get-restaurants/${ownerId}`,
      {
        headers: {
          "Include-Authorization": true,
        },
      },
    );
    return response;
  } catch (error) {
    throw new Error("Restaurants not found");
  }
};

export const restaurantOrders = async (restaurantId) => {
  try {
    const response = await AxiosInstance.get(
      `/Restaurant/get-orders/${restaurantId}`,
      {
        headers: {
          "Include-Authorization": true,
        },
      },
    );
    return response;
  } catch (error) {
    throw new Error("Orders not found");
  }
};

export const fetchReviewsByRestaurant = async (restaurantId) => {
  try {
    const response = await AxiosInstance.get(
      `/Review/restaurant/${restaurantId}/reviews`,
    );
    return response.data;
  } catch (error) {
    throw new Error("Reviews not found");
  }
};

export const fetchReviewsBydeliveryPartner = async (partnerId) => {
  try {
    const response = await AxiosInstance.get(
      `Review/delivery-partner/${partnerId}/reviews`,
    );
    return response.data;
  } catch (error) {
    throw new Error("Reviews not found");
  }
};

export const updateOrderStatus = async (orderId, orderStatus) => {
  if (orderStatus === "Preparing") {
    orderStatus = "OutForDelivery";
    let orderStatusDto = {
      orderId: orderId,
      status: orderStatus,
    };
    try {
      const response = await AxiosInstance.put(
        `/Order/update-status`,
        orderStatusDto,
      );
      return response;
    } catch (error) {}
  }

  if (orderStatus === "OutForDelivery") {
    orderStatus = "Delivered";
    let orderStatusDto = {
      orderId: orderId,
      status: orderStatus,
    };
    try {
      const response = await AxiosInstance.put(
        `/Order/update-status`,
        orderStatusDto,
      );
      return response;
    } catch (error) {}
  }
};
export const addRestaurant = async (restaurantDetails) => {
  try {
    const response = await AxiosInstance.post(
      "/Restaurant/Register",
      restaurantDetails,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Include-Authorization": true,
        },
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchRestaurantByUserId = async (userId) => {
  try {
    const response = await AxiosInstance.get(
      `/Restaurant/get-restaurants/${userId}`,
      {
        headers: {
          "Include-Authorization": true,
        },
      },
    );
    return response.data.restaurants;
  } catch (error) {
    throw error;
  }
};
export const getSearchResults = async (query) => {
  try {
    const response = await AxiosInstance.get(
      `User/search-restaurants?searchTerm=${query}`,
      {
        headers: {
          "Include-Authorization": false,
        },
      },
    );
    return response.data;
  } catch (error) {
    return [];
  }
};
