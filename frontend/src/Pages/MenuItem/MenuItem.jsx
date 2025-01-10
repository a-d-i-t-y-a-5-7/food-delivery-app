import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ReviewCard } from "../../Components/Review/ReviewCard";
import { fetchMenuItemsDetail } from "../../Helper/MenuItem";
import { fetchReviewsByRestaurant } from "../../Helper/RestaurantHelper";
import { addToCart } from "../../Redux/Slices/cartSlice";
import "./MenuItem.css";
export function MenuItem() {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.auth);
  const { restaurantId } = useParams();
  const fetchMenuItems = async () => {
    try {
      const response = await fetchMenuItemsDetail(restaurantId);
      console.log("FoodItems", response);
      setMenuItems(response);
    } catch (error) {
      setError(`Failed to fetch menu items: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  const GetReviews = async () => {
    try {
      const reviewData = await fetchReviewsByRestaurant(restaurantId);
      setReviews(reviewData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchMenuItems();
    GetReviews();
  }, [restaurantId]);

  const handleMenuClick = (item) => {
    if (!userId) {
      toast.error("No cart available. Please login first.", {
        position: "top-right",
        autoClose: 5000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 5000);
      return;
    }

    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
        description: item.description,
        availableQuantity: item.quantity,
        restaurantId: item.restaurantId,
      })
    );
    toast.success("Item added to the cart.", {
      position: "top-right",
      autoClose: 2000,
    });

    // setTimeout(() => {
    //   navigate("/addtocart");
    // }, 500);
  };

  const renderContent = (key) => {
    switch (key) {
      case "review":
        return (
          <div className="review-container">
            {reviews.length === 0 ? (
              <p>No Reviews found.</p>
            ) : (
              reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  rating={review.rating}
                  comment={review.comment}
                  orderId={review.orderId}
                />
              ))
            )}
          </div>
        );
      case "menu":
        return (
          <div className="d-flex">
            {menuItems.length === 0 ? (
              <p>No Menu Items Available</p>
            ) : (
              menuItems.map((item) => (
                <div
                  key={item.id}
                  className="col-md-4 d-flex justify-content-center m-3"
                >
                  <div
                    className="card shadow-sm p-3 mb-4 bg-white rounded"
                    style={{ width: "18rem" }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="card-img-top rounded"
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title mb-2">{item.name}</h5>
                      <p
                        className="card-text text-muted mb-2"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {item.description}
                      </p>
                      <div className="my-3">
                        <span className="text-secondary fw-bold">
                          Price: {item.price || "N/A"}/-
                        </span>
                      </div>
                      <button
                        className="btn btn-primary w-100"
                        onClick={() => handleMenuClick(item)}
                      >
                        ADD
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>No Menu Item Found For This Restaurant</div>;
  }

  return (
    <div className="container mt-4">
      <div
        style={{
          width: "100%",
          height: "20rem",
          backgroundImage: "url(/assets/banner.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* <h2 className="text-center mb-4">Menu Items</h2> */}

      <div className="profile-content">
        <div className="tabs-section">
          <Tabs defaultActiveKey="reviews">
            <TabPane tab="Reviews" key="review">
              {renderContent("review")}
            </TabPane>
            <TabPane tab="Menu" key="menu">
              {renderContent("menu")}
            </TabPane>
          </Tabs>
        </div>
      </div>
      {/* <div className="row">
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <div
              key={item.id}
              className="col-md-4 d-flex justify-content-center"
            >
              <div
                className="card shadow-sm p-3 mb-4 bg-white rounded"
                style={{ width: "18rem" }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="card-img-top rounded"
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title mb-2">{item.name}</h5>
                  <p
                    className="card-text text-muted mb-2"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {item.description}
                  </p>
                  <div className="my-3">
                    <span className="text-secondary fw-bold">
                      Price: {item.price || "N/A"}/-
                    </span>
                  </div>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => handleMenuClick(item)}
                  >
                    ADD
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-4">
            <p className="text-muted">No Menu Items Available</p>
          </div>
        )}
      </div> */}
    </div>
  );
}
