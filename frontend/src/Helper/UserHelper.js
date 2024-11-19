import AxiosInstance from "./AxiosInstance";

export const fetchRestaurants = async () => {
    try {
      const response = await AxiosInstance.get(`Restaurant/get-all-restaurants`, {
      });
      return response.data.restaurants;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch Restaurants.');
    }
  };