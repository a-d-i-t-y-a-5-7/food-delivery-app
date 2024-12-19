import AxiosInstance from "./AxiosInstance";
import CryptoJS from "crypto-js";
const secretKey = process.env.REACT_APP_SECRET_KEY

export const getMenuItemList = async (id) => {
  try {
    const response = await AxiosInstance.get(`FoodItem/${id}`, {
      headers: {
        "Include-Authorization": true,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const addMenuItem = async (menuItemDetails, id) => {
    try {
        const response = await AxiosInstance.post(
            `/FoodItem/AddmenuItem/${id}`,
            menuItemDetails,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Include-Authorization": true,
                },
            },
        );
        return response;
    } catch (error) {
        throw error
    }
};

export const getCuisinesAndCategoryList = async () => {
  try {
    const response = await AxiosInstance.get(
      "FoodItem/GetListOfCuisineAndCategory",
      {
        headers: {
          "Include-Authorization": true,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateMenuItem = async (id, updateMenuItemDetails) => {
  try {
    const response = await AxiosInstance.put(
      `FoodItem/UpdateMenuItemById/${id}`,
      updateMenuItemDetails,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Include-Authorization": true,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};


export const decodeparams = (encodedId) => {
    const decodedEncryptedId = decodeURIComponent(encodedId);
    const bytes = CryptoJS.AES.decrypt(decodedEncryptedId, secretKey);
    const decryptedparams = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedparams) {
      throw new Error('Invalid restaurant ID');
    }
    return decryptedparams;
  };
export const fetchMenuItemsDetail = async (id) => {
  try {
    const response = await AxiosInstance.get(
      `FoodItem/GetListofmenuItemByRestaurant/${id}`,
      {
        headers: {
          "Include-Authorization": true,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
