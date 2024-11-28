import AxiosInstance from "./AxiosInstance";

export const fetchMyOrders = async (id) => {
    try {
        const response = await AxiosInstance.get(`/Order/get-orders/${id}`, {
            headers: {
                "Include-Authorization": true
            }
        });
        return response;
    } catch (error) {
        throw new Error("Orders not found");
    }
}