import React from "react";
import { useState, useEffect } from 'react';
import { Card, Select } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';

const { Option } = Select;

const restaurants = [
  { id: 1, name: 'Italian Bistro', cuisine: 'Italian', deliveryTime: 30, rating: 4.5 },
  { id: 2, name: 'Sushi Place', cuisine: 'Japanese', deliveryTime: 25, rating: 4.8 },
  { id: 3, name: 'Curry House', cuisine: 'Indian', deliveryTime: 40, rating: 4.2 },
  { id: 4, name: 'Burger Joint', cuisine: 'American', deliveryTime: 20, rating: 4.6 },
  { id: 5, name: 'Taco Fiesta', cuisine: 'Mexican', deliveryTime: 35, rating: 4.4 },
  { id: 6, name: 'Vegan Delight', cuisine: 'Vegan', deliveryTime: 30, rating: 4.7 },
  { id: 7, name: 'Mediterranean Grill', cuisine: 'Mediterranean', deliveryTime: 45, rating: 4.3 },
  { id: 8, name: 'BBQ Haven', cuisine: 'BBQ', deliveryTime: 25, rating: 4.9 },
  { id: 9, name: 'Pizza Palace', cuisine: 'Italian', deliveryTime: 20, rating: 4.6 },
  { id: 10, name: 'Dumpling House', cuisine: 'Chinese', deliveryTime: 30, rating: 4.8 },
  { id: 11, name: 'Steakhouse 99', cuisine: 'Steakhouse', deliveryTime: 50, rating: 4.7 },
  { id: 12, name: 'Pasta Paradise', cuisine: 'Italian', deliveryTime: 40, rating: 4.5 },
  { id: 13, name: 'Pho Haven', cuisine: 'Vietnamese', deliveryTime: 30, rating: 4.6 },
  { id: 14, name: 'Wok This Way', cuisine: 'Chinese', deliveryTime: 35, rating: 4.4 },
  { id: 15, name: 'Sandwich Station', cuisine: 'American', deliveryTime: 20, rating: 4.5 },
  { id: 16, name: 'Poke Paradise', cuisine: 'Hawaiian', deliveryTime: 30, rating: 4.8 },
  { id: 17, name: 'Fried Chicken Co.', cuisine: 'American', deliveryTime: 25, rating: 4.6 },
  { id: 18, name: 'Sushi Express', cuisine: 'Japanese', deliveryTime: 15, rating: 4.9 },
  { id: 19, name: 'Bakery Bliss', cuisine: 'Bakery', deliveryTime: 20, rating: 4.5 },
  { id: 20, name: 'Korean BBQ House', cuisine: 'Korean', deliveryTime: 45, rating: 4.7 },
];

export const Home = () => {
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [cuisineFilter, setCuisineFilter] = useState('');
  const [deliveryTimeFilter, setDeliveryTimeFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

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
  }, [cuisineFilter, deliveryTimeFilter, ratingFilter]);

  return (
    <div className="container">
      <h2>Restaurant Listings</h2>
      <div className="filters mb-3">
        <Select
          placeholder="Select Cuisine"
          onChange={setCuisineFilter}
          style={{ width: 200, marginRight: '16px' }}
        >
          <Option value="">All Cuisines</Option>
          <Option value="Italian">Italian</Option>
          <Option value="Japanese">Chinese</Option>
          <Option value="Indian">Indian</Option>
          <Option value="American">Mexican</Option>
        </Select>
        <Select
          placeholder="Max Delivery Time (min)"
          onChange={value => setDeliveryTimeFilter(value)}
          style={{ width: 200, marginRight: '16px' }}
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
            <Card title={restaurant.name} bordered={false}>
              <p>Cuisine: {restaurant.cuisine}</p>
              <p>Delivery Time: {restaurant.deliveryTime} min</p>
              <p>Rating: {restaurant.rating} ⭐</p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
