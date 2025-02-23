import AxiosInstance from "./AxiosInstance";

export const getUserById = async (userId) => {
  try {
    const response = await AxiosInstance.get(`/user/${userId}`, {
      headers: {
        "Include-Authorization": true,
      },
    });
    return response.data;
  } catch (error) {
    // throw new Error("Please check userId.");
  }
};

export const getReviewById = async (userId) => {
  try {
    const response = await AxiosInstance.get(`/Review/user/${userId}`, {
      headers: {
        "Include-Authorization": true,
      },
    });
    return response.data;
  } catch (error) {
    // throw new Error("Please check userId.");
  }
};

export const AddReview = async (review) => {
  try {
    const response = await AxiosInstance.post(`/Review`, review, {
      headers: {
        "Include-Authorization": true,
      },
    });
    return response.data;
  } catch (error) {
    // throw new Error("Please check userId.");
  }
};

export const updateUser = async (userId, updatedData) => {
  try {
    const response = await AxiosInstance.patch(
      `/user/${userId}/update-profile`,
      updatedData,
      {
        headers: {
          "Include-Authorization": true,
        },
      }
    );
    return response.data;
  } catch (error) {
    // throw new Error("Please check userId.");
  }
};
