import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearCart,
  incrementQuantity,
  decrementQuantity,
} from "../../Redux/Slices/cartSlice";

export const AddToCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    navigate("/address");
  };

  const handleBrowseRestaurants = () => {
    navigate("/");
  };

  const handleIncrementQuantity = (item) => {
    if (item.quantityInCart < item.availableQuantity) {
      dispatch(incrementQuantity(item.id));
    } else {
      toast.error(
        `Out of stock: Only ${item.availableQuantity} items are available.`,
      );
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "1200px" }}>
      <h2 className="text-left mb-4">Cart Items</h2>
      <div className="row">
        <div className="col-md-12">
          {cartItems.length === 0 ? (
            <div className="text-center">
              <p>No items in your cart</p>
              <button
                className="btn btn-primary mt-3"
                onClick={handleBrowseRestaurants}
              >
                Browse Restaurants
              </button>
            </div>
          ) : (
            <div>
              <div className="row">
                {cartItems.map((item) => (
                  <div key={item.id} className="col-md-6 mb-4">
                    <div
                      className="card"
                      style={{ borderRadius: "10px", overflow: "hidden" }}
                    >
                      <div className="d-flex">
                        <div className="container p-3 d-flex align-items-center">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="img-fluid"
                            style={{
                              width: "200px",
                              height: "150px",
                              objectFit: "cover",
                              borderRadius: "10px",
                            }}
                          />
                          <div className="ms-5">
                            <h5>{item.name}</h5>
                            <h6>{item.description}</h6>
                            <p className="mb-1 text-muted">Price: ₹{item.price}</p>
                            <div className="d-flex align-items-center gap-3 mt-2">
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() =>
                                  dispatch(decrementQuantity(item.id))
                                }
                              >
                                -
                              </button>
                              <span>{item.quantityInCart}</span>
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => handleIncrementQuantity(item)}
                              >
                                +
                              </button>
                            </div>
                            <div className="mt-2">
                              <p className="text-muted"><strong>
                                Total: ₹{item.price * item.quantityInCart}
                                </strong>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-center mt-3 gap-3">
                <button className="btn btn-danger" onClick={handleClearCart}>
                  Clear Cart
                </button>
                <button className="btn btn-primary" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* <div className="col-md-4">
          <div className="card p-3">
            <h5>Special Offers</h5>
            <div className="d-flex justify-content-between align-items-center">
              <img
                src="https://img.pikbest.com/origin/09/07/51/74NpIkbEsTIXv.jpg!bw700"
                style={{ width: "100%", height: "400px" }}
                alt="offer"
              />
            </div>
            <div className="text-center mt-2">
              <button
                className="btn btn-primary mt-2"
                onClick={handleBrowseRestaurants}
              >
                Order Now
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};
