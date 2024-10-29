import AxiosInstance from "./AxiosInstance";

export const getRestaurantList = async(ownerId) =>{
    try {
        const response = await AxiosInstance.get(`/Restaurant/get-restaurants/${ownerId}`,{
            headers:{
                'Include-Authorization':true
            }
        });
        return response;
    } catch (error) {
        throw new Error('Restaurants not found');
    }
}