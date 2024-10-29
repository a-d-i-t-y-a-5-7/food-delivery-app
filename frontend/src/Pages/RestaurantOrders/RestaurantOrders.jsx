import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { restaurantOrders } from '../../Helper/RestaurantHelper';

export const RestaurantOrders = () => {

    const [orders, setOrders] = useState([]);

    const {restaurantId} = useParams();
    
    let getOrders = async() =>{
        try{
            const response = await restaurantOrders(restaurantId);
            console.log(response);
            setOrders(response.data.orders);
        }catch(error){
            console.log(error);
        }
    }
    
    useEffect(() =>{
        getOrders();
    },[])

    return (
        <div>
            {
                orders.map(o =>(
                    <p>{o.id}</p>
                ))
            }
        </div>
    )
}

