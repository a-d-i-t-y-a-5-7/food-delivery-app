import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCart, incrementQuantity, decrementQuantity } from "../../Redux/Slices/cartSlice";

const AddToCart = () => {
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
    navigate('/address');
  };

  const handleBrowseRestaurants = () => {
    navigate('/');
  };

  const handleIncrementQuantity = (item) => {
    if (item.quantityInCart < item.availableQuantity) {
      dispatch(incrementQuantity(item.id));
    } else {
      toast.error(`Out of stock: Only ${item.availableQuantity} items are available.`);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "1200px" }}>
      <h2 className="text-left mb-4">Items in your Cart</h2>
      <div className="row">
        <div className="col-md-8">
          {cartItems.length === 0 ? (
            <div className="text-center">
              <p>No items in your cart</p>
              <button className="btn btn-primary mt-3" onClick={handleBrowseRestaurants}>
                Browse Restaurants
              </button>
            </div>
          ) : (
            <div>
              <div className="row">
                {cartItems.map((item) => (
                  <div key={item.id} className="col-md-6 mb-4">
                    <div className="card" style={{ borderRadius: "10px", overflow: "hidden" }}>
                      <div className="d-flex">
                        <div className="container p-3 d-flex align-items-center">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="img-fluid"
                            style={{
                              width: "150px",
                              height: "120px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                          <div className="ms-3">
                            <h5>{item.name}</h5>
                            <p className="mb-1 text-muted">Price: ₹{item.price}</p>
                            <div className="d-flex align-items-center gap-3 mt-2">
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => dispatch(decrementQuantity(item.id))}
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
                              <p className="text-muted">
                                Total: ₹{item.price * item.quantityInCart}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button className="btn btn-primary" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
                <button className="btn btn-danger ms-2" onClick={handleClearCart}>
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="col-md-4">
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
              <button className="btn btn-primary mt-2" onClick={handleBrowseRestaurants}>
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
