import React, { useEffect, useState } from 'react';
import { decodedJwt } from '../../Helper/JwtHelper';
import { getRestaurantList } from '../../Helper/RestaurantHelper';
import { useNavigate } from 'react-router-dom';

export default function RestaurantList() {

    const [restaurantList, setRestaurantList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    let restaurants = async () => {
        const logiinObj = decodedJwt();
        if (logiinObj != null) {
            try {
                const response = await getRestaurantList(parseInt(logiinObj.sub));
                console.log(response);
            } catch (error) {
                setErrorMessage(error.message);
            }
        }
        else {
            navigate('/login');
        }
    }

    useEffect(() => {
        restaurants();
    })

    return (
        <div>

        </div>
    )
}
