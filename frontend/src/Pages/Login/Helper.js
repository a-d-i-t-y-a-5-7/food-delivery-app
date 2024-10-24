import axios from "axios";

export const apiLogin = async (loginDetails) => {
  try {
    const response = await axios.post(
      "https://localhost:44357/api/User/login",
      loginDetails,
    );
    return response.data;
  } catch (error) {
    throw new Error("Login failed. Please check your credentials.");
  }
};
