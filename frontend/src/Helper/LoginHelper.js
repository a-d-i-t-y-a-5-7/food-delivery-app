import AxiosInstance from "./AxiosInstance";

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
