import axios from "axios";

export const handleRegister = async (registerDetails) => {
  try {
    const response = await axios.post(
      "https://localhost:44357/api/User/register",
      registerDetails
    );
    return response.data;
  } catch (error) {
    throw new Error("Register failed. Please try again.");
  }
};
