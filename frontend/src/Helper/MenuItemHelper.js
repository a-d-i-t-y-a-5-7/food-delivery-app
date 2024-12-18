// import AxiosInstance from "./AxiosInstance";

// export const fetchMenuItemsByRestaurant = async (restaurantId) => {
//   try {
//     const response = await AxiosInstance.get(
//       `/FoodItem/GetListofmenuItemByRestaurant/${restaurantId}`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch menu items:", error);
//     throw new Error(
//       error.response?.data?.errorMessage || "Failed to fetch menu items."
//     );
//   }
// };

// export const fetchCuisineAndCategories = async () => {
//   try {
//     const response = await AxiosInstance.get(
//       "/FoodItem/GetListOfCuisineAndCategory"
//     );
//     return {
//       cuisines: response.data.cuisines,
//       categories: response.data.categories,
//     };
//   } catch (error) {
//     console.error("Failed to fetch cuisine and category data:", error);
//     throw new Error(
//       error.response?.data?.errorMessage || "Failed to fetch data."
//     );
//   }
// };

// export const addMenuItem = async (formData) => {
//   try {
//     const response = await AxiosInstance.post(
//       `/FoodItem/AddmenuItem/${formData.get("restaurantId")}`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Failed to add new menu item:", error);
//     throw new Error(
//       error.response?.data?.errorMessage || "Failed to add new menu item."
//     );
//   }
// };

// export const updateMenuItemById = async (menuItemId, formData) => {
//   try {
//     const response = await AxiosInstance.put(
//       `/FoodItem/UpdateMenuItemById/${menuItemId}`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Failed to update menu item:", error);
//     throw new Error(
//       error.response?.data?.errorMessage || "Failed to update menu item."
//     );
//   }
// };
