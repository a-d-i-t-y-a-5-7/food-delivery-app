import { Card, Col, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSearchResults } from "../../Helper/RestaurantHelper";

export const SearchResult = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      fetchRestaurants(query);
    }
  }, [query]);

  const fetchRestaurants = async (searchQuery) => {
    setLoading(true);
    try {
      const results = await getSearchResults(searchQuery);
      setRestaurants(results);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/menuItem/${id}`);
  };

  return (
    <div className="m-4">
      <h4>Search Results for "{query}"</h4>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]} className="m-4">
          {restaurants.length === 0 ? (
            <p>No restaurants found</p>
          ) : (
            restaurants.map((restaurant) => (
              <Col xs={24} sm={12} md={6} key={restaurant.id}>
                <Card
                  cover={
                    <img
                      alt={restaurant.name}
                      src={restaurant.imageUrl}
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
            ))
          )}
        </Row>
      )}
    </div>
  );
};
