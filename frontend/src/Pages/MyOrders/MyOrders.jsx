import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { fetchMyOrders } from '../../Helper/OrderHelper';

export const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);

    const decodeToken = () => {
        const token = sessionStorage.getItem("accessToken");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                return { userId: decoded.sub };
            } catch (error) {
                console.error("Invalid token in sessionStorage:", error);
            }
        }
        return { userId: null };
    }

    const getMyOrders = async() => {
        const {userId} = decodeToken();
        const response = await fetchMyOrders(userId);
        setMyOrders(response.data.orders);
    };

    useEffect(() => {
        getMyOrders();
    }, []);

    return (
        <div>
            
        </div>
    )
}
