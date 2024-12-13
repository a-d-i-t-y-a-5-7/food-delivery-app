import AxiosInstance from "./AxiosInstance";

export const fetchRestaurants = async () => {
  try {
    const response = await AxiosInstance.get(
      `/Restaurant/get-all-restaurants`,
      {
        headers: {
          "Include-Authorization": true,
        },
      }
    );
    return response.data.restaurants;
  } catch (error) {
    throw new Error("Failed to fetch Restaurants.");
  }
};

export const handleRegister = async (registerDetails) => {
  try {
    const response = await AxiosInstance.post(
      "/User/register",
      registerDetails,
      {
        headers: {
          "Include-Authorization": false,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Register failed. Please try again.");
  }
};

export const apiLogin = async (loginDetails) => {
  try {
    const response = await AxiosInstance.post("/User/login", loginDetails, {
      headers: {
        "Include-Authorization": false,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Login failed. Please check your credentials.");
  }
};
