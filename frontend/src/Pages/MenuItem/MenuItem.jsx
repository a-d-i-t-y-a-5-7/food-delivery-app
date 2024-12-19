import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchMenuItemsDetail } from '../../Helper/MenuItem';
import './MenuItem.css'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/Slices/cartSlice';
export function MenuItem() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.auth);
  const { restaurantId } = useParams();
  const fetchMenuItems = async () => {
    try {
      const response = await fetchMenuItemsDetail(restaurantId);
      setMenuItems(response);
    } catch (error) {
      setError(`Failed to fetch menu items: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
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

    setTimeout(() => {
      navigate("/addtocart");
    }, 500);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>No Menu Item Found For This Restaurant</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Menu Items</h2>
      <div className="row">
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
      </div>
    </div>
  );
}
