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
                setRestaurantList(response.data.restaurants);
            } catch (error) {
                setErrorMessage(error.message);
            }
        }
        else {
            navigate('/login');
        }
    }

    let navigateToOrders = (restaurantId) =>{
        navigate(`/restaurantOrders/${restaurantId}`)
    }

    useEffect(() => {
        restaurants();
    },[])

    return (
        <div>
            {
                restaurantList.map(r => (
                    <p onClick={() => navigateToOrders(r.id)} key={r.id} style={{cursor:'pointer'}}>{r.name}</p>
                ))
            }
        </div>
    )
}
