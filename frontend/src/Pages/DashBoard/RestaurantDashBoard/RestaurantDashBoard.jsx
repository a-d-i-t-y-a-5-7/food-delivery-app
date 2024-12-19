import React, { useState, useEffect } from "react";
import { Card, Breadcrumb, Spin, Alert, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import CryptoJS from "crypto-js";
import {fetchRestaurantByUserId} from "../../../Helper/RestaurantHelper"

export const RestaurantDashBoard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
 const secretKey = process.env.REACT_APP_SECRET_KEY
  const { userId } = useSelector((state) => state.auth);
  console.log(userId);
  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }
    const getRestaurants = async () => {
      try {
        const restaurantData = await fetchRestaurantByUserId(userId);
        console.log(restaurantData);
        if (Array.isArray(restaurantData) && restaurantData.length > 0) {
          setRestaurants(restaurantData);
        } else {
          setError("No restaurants found.");
        }
      } catch (error) {
        console.log("error", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getRestaurants();
  }, [userId, navigate]);

  const handleCardClick = (restaurantId) => {
    const encryptedRestaurantId = CryptoJS.AES.encrypt(restaurantId.toString(),secretKey).toString();
    const encodedId = encodeURIComponent(encryptedRestaurantId);
    navigate(`/RestaurantMenuItem/${encodedId}`);  
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="container">
      <Breadcrumb className="my-3">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Restaurants</Breadcrumb.Item>
      </Breadcrumb>

      <div
        style={{
          width: "100%",
          height: "20rem",
          backgroundImage: "url(/assets/banner.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          closable
          className="mt-3"
        />
      )}

      <Row gutter={[16, 16]} className="mt-4">
        {restaurants.map((restaurant) => (
          <Col xs={24} sm={12} md={6} key={restaurant.id}>
            <Card
              cover={
                <img
                  alt={restaurant.name}
                  src={restaurant.image_url}
                  onClick={() => handleCardClick(restaurant.id)}
                  style={{ width: "100%", height: "200px", objectFit: "cover", cursor: "pointer" }}
                />
              }
              className="text-center"
              bordered={false}
              style={{ borderRadius: "10px" }}
            >
              <h5 className="font-weight-bold">{restaurant.name}</h5>
              <p>{`Cuisine: ${restaurant.cuisine}, Delivery Time: ${restaurant.deliveryTime} min, Rating: ${restaurant.rating} ⭐`}</p>{" "}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
