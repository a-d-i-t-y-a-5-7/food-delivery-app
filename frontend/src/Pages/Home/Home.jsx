import React, { useState, useEffect } from "react";
import { Card, Breadcrumb, Spin, Alert, Row, Col } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchRestaurants } from '../../Helper/UserHelper';

export const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const restaurantData = await fetchRestaurants();
        setRestaurants(restaurantData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getRestaurants();
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="container">
     
      <Breadcrumb className="my-3">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Restaurants</Breadcrumb.Item>
      </Breadcrumb>

      <div style={{
        width: '100%',
        height: '20rem',
        backgroundImage: 'url(/assets/banner.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} />

      {error && <Alert message={error} type="error" showIcon closable className="mt-3" />}

      <Row gutter={[16, 16]} className="mt-4">
        {restaurants.map(restaurant => (
          <Col xs={24} sm={12} md={6} key={restaurant.id}>
            <Card
              cover={
                <img
                  alt={restaurant.name}
                  src={restaurant.image_url}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
              }
              className="text-center"
              bordered={false}
              style={{ borderRadius: '10px' }} 
            >
              <h5 className="font-weight-bold">{restaurant.name}</h5>
              <p>{`Cuisine: ${restaurant.cuisine}, Delivery Time: ${restaurant.deliveryTime} min, Rating: ${restaurant.rating} ⭐`}</p> {/* Comma-separated details */}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
