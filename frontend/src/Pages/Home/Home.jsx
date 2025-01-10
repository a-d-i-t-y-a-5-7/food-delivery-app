import { Alert, Card, Col, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRestaurants } from "../../Helper/UserHelper";
import { setRestaurantId } from "../../Redux/Slices/cartSlice";
import {
  FaTruck,
  FaLocationArrow,
  FaCreditCard,
} from "react-icons/fa";
import ImageRow from "../../Components/LandingPage/ImageRow";

export const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const restaurantData = await fetchRestaurants();
        console.log(restaurantData);
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

  const handleCardClick = (restaurantId) => {
    dispatch(setRestaurantId(restaurantId));
    navigate(`/menuItem/${restaurantId}`);
  };

  const features = [
    { icon: <FaTruck className="me-2" size={20} />, text: "Fast Delivery" },
    { icon: <FaLocationArrow className="me-2" size={20} />, text: "Live Tracking" },
    { icon: <FaCreditCard className="me-2" size={20} />, text: "Hassle-free Payment" },
  ];

  return (
    <>
      <div className="d-flex justify-content-center align-items-center w-100 flex-column">
        <div
          className="text-center p-4 text-white rounded shadow w-100"
          style={{
            backgroundImage: "linear-gradient(to right, rgb(242,169,62), rgb(240,112,84))",
          }}
        >
          <h1 className="fw-bold display-3">Swigato</h1>
          <p className="lead">Order your most favourite food dishes today! 😋</p>
          <ImageRow iconRow={features} />
        </div>
      </div>

      <div className="container p-2">
        <Row gutter={[16, 16]} className="mt-4">
          {restaurants.map((restaurant) => (
            <Col xs={24} sm={12} md={6} key={restaurant.id}>
              <Card
                cover={
                  <img
                    alt={restaurant.name}
                    src={restaurant.image_url}
                    onClick={() => handleCardClick(restaurant.id)}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />
                }
                className="text-center"
                bordered={false}
                style={{ borderRadius: "10px" }}
              >
                <h5 className="font-weight-bold">{restaurant.name}</h5>
                <p>{`Cuisine: ${restaurant.cuisine}, Delivery Time: ${restaurant.deliveryTime} min, Rating: ${restaurant.rating} ⭐`}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};
