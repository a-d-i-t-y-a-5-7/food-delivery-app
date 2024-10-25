import React from 'react';
import { decodedJwt } from '../../Helper/JwtHelper';

export const RestaurantOrders = () => {

    const loginObj = decodedJwt();
    console.log(loginObj);
    

    return (
        <div>

        </div>
    )
}

