import React, { useState, useEffect } from "react";
import { Card, Select, Spin, Alert } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const { Option } = Select;

export const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [cuisineFilter, setCuisineFilter] = useState('');
  const [deliveryTimeFilter, setDeliveryTimeFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('https://localhost:44357/api/Restaurant/get-all-restaurants');
        setRestaurants(response.data.restaurants); 
        setFilteredRestaurants(response.data.restaurants); 
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setError("Failed to fetch restaurants. Please try again later."); 
      } finally {
        setLoading(false); 
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    let filtered = restaurants;

    if (cuisineFilter) {
      filtered = filtered.filter(restaurant => restaurant.cuisine === cuisineFilter);
    }
    if (deliveryTimeFilter) {
      filtered = filtered.filter(restaurant => restaurant.deliveryTime <= deliveryTimeFilter);
    }
    if (ratingFilter) {
      filtered = filtered.filter(restaurant => restaurant.rating >= ratingFilter);
    }

    setFilteredRestaurants(filtered);
  }, [cuisineFilter, deliveryTimeFilter, ratingFilter, restaurants]);

  if (loading) {
    return <Spin size="large" />; 
  }

  return (
    <div className="container">
      <h2 className="my-4 text-center">Restaurants</h2>
      {error && <Alert message={error} type="error" showIcon closable />} 

      <div className="filters mb-3 text-center">
        <Select
          placeholder="Select Cuisine"
          onChange={setCuisineFilter}
          className="mr-2"
          style={{ width: 200 }}
        >
          <Option value="">All Cuisines</Option>
          <Option value="Italian">Italian</Option>
          <Option value="Indian">Indian</Option>
          <Option value="Mexican">Mexican</Option>
          <Option value="Chinese">Chinese</Option>
        </Select>
        <Select
          placeholder="Max Delivery Time (min)"
          onChange={value => setDeliveryTimeFilter(value)}
          className="mr-2"
          style={{ width: 200 }}
        >
          <Option value="">Any Time</Option>
          <Option value="20">20</Option>
          <Option value="30">30</Option>
          <Option value="40">40</Option>
        </Select>
        <Select
          placeholder="Min Rating"
          onChange={value => setRatingFilter(value)}
          style={{ width: 200 }}
        >
          <Option value="">Any Rating</Option>
          <Option value="4">4 Stars</Option>
          <Option value="4.5">4.5 Stars</Option>
          <Option value="5">5 Stars</Option>
        </Select>
      </div>

      <div className="row">
        {filteredRestaurants.map(restaurant => (
          <div className="col-md-3 mb-4" key={restaurant.id}>
            <Card className="h-100" bordered={false}>
              {restaurant.name === "Spice Factory" && (
                <img 
                  src="/assets/Spice factory.webp" 
                  alt={restaurant.name}
                  className="card-img-top img-fluid rounded"
                />
              )}
              <div className="card-body text-center">
                <h5 className="card-title">{restaurant.name}</h5>
                <p className="card-text">Cuisine: {restaurant.cuisine}</p>
                <p className="card-text">Delivery Time: {restaurant.deliveryTime} min</p>
                <p className="card-text">Rating: {restaurant.rating} ⭐</p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
