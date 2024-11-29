import AxiosInstance from "./AxiosInstance";

export const getMenuItemList = async (id) => {
    try {
        const response = await AxiosInstance.get(
            `FoodItem/${id}`, {
            headers: {
                "Include-Authorization": true,
            }
        }
        )
        return response;
    }
    catch (error) {
        throw error
    }
};

export const addMenuItem = async (menuItemDetails, id) => {
    try {
        debugger;;
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
            'FoodItem/GetListOfCuisineAndCategory', {
            headers: {
                "Include-Authorization": true,
            }
        }
        )
        return response;
    }
    catch (error) {
        throw error
    }
};

export const updateMenuItem = async (id, updateMenuItemDetails) => {
    try {
        const response = await AxiosInstance.put(
            `FoodItem/UpdateMenuItemById/${id}`,
            updateMenuItemDetails, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Include-Authorization": true,
            },
        },
        );
        return response;
    }
    catch(error){
        throw error;
    }   
}

export const fetchMenuItemsDetail = async (id) => {
try{
    const response = await AxiosInstance.get(
        `FoodItem/GetListofmenuItemByRestaurant/${id}`,
        {
            headers:{
                "Include-Authorization": true,
            },
        },
    );
    return response;
}
catch (error){
    throw error
}
}

