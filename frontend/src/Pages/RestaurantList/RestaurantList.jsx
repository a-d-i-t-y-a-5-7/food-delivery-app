import React, { useEffect, useState } from "react";
import { decodedJwt } from "../../Helper/JwtHelper";
import { getRestaurantList } from "../../Helper/RestaurantHelper";
import { useNavigate } from "react-router-dom";
import { Card, Alert, Row, Col } from "antd";

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
    } else {
      navigate("/login");
    }
  };

  let navigateToOrders = (restaurantId) => {
    navigate(`/restaurantOrders/${restaurantId}`);
  };

  useEffect(() => {
    restaurants();
  }, []);

  return (
    <div className="container">
      <div
        style={{
          width: "100%",
          height: "20rem",
          backgroundImage: "url(/assets/banner.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {errorMessage && (
        <Alert
          message={errorMessage}
          type="error"
          showIcon
          closable
          className="mt-3"
        />
      )}

      <Row gutter={[16, 16]} className="mt-4">
        {restaurantList.map((restaurant) => (
          <Col xs={24} sm={12} md={6} key={restaurant.id}>
            <Card
              cover={
                <img
                  alt={restaurant.name}
                  src={restaurant.image_url}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              }
              onClick={() => navigateToOrders(restaurant.id)}
              className="text-center"
              bordered={false}
              style={{ borderRadius: "10px" }}
            >
              <h5 className="font-weight-bold">{restaurant.name}</h5>
              <p>{`Cuisine: ${restaurant.cuisine}, Delivery Time: ${restaurant.deliveryTime} min, Rating: ${restaurant.rating} ⭐`}</p>{" "}
              {/* Comma-separated details */}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
