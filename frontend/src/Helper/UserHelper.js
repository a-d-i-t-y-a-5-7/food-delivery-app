import axios from 'axios';
const BASE_URL = 'https://localhost:44357/api/Restaurant';

export const fetchRestaurants = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-all-restaurants`, {
      });
      return response.data.restaurants;
    } catch (error) {
      throw new Error('Failed to fetch Restaurants.');
    }
  };