import AxiosInstance from "./AxiosInstance";

export const handleRegister = async (registerDetails) => {
  try {
    const response = await AxiosInstance.post(
      "/User/register",
      registerDetails,
      {
        headers: {
          "Include-Authorization": false,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error("Register failed. Please try again.");
  }
};
