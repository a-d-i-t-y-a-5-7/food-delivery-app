import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateMenuItem, getCuisinesAndCategoryList, fetchMenuItemsDetail } from '../../Helper/MenuItem';
import './MenuItem.css'
function MenuItem() {
  const resetFormData = {
    name: '',
    description: '',
    price: '',
    cuisineTypeId: '',
    categoryId: '',
    isAvailable: '',
    image: null,
  }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(resetFormData);


  const fetchMenuItems = async () => {
    try {
      const response = await fetchMenuItemsDetail(1);
      if (response.status === 200) {
        setMenuItems(response.data);
        setRestaurantId(response.data[0].restaurantId);
      }
      else {
        setMenuItems([]);
      }
    } catch (error) {
      setError(`Failed to fetch menu items: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        image: files[0],
      }));
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setCuisines([]);
    setCategories([]);
  };
  const handleEditClick = async (item) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price || "",
      cuisineTypeId: item.cuisineTypeId || "",
      categoryId: item.categoryId || "",
      isAvailable: item.isAvailable || "",
      image: null,
    });
    setShowModal(true);
    try {
      const response = await getCuisinesAndCategoryList();
      if (response.status === 200) {
        setCuisines(response.data.cuisines);
        setCategories(response.data.categories);
      }
      else {
        alert("failed to get Cuisines and Category Details");
      }
    }
    catch (error) {
      if (error.response.status === 400 || 500) {
        alert(`${error.response?.data?.errorMessage || 'Unknown error'}`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const MenuItemDetails = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== undefined && formData[key] !== null) {
        MenuItemDetails.append(key, formData[key]);
      }
    });
    if (formData.image) {
      MenuItemDetails.append('image', formData.image);
    }
    try {
      const response = await updateMenuItem(selectedItem.id, MenuItemDetails)
      if (response.status === 200) {
        console.log('Menu Item Updated Successfully', response);
        alert('Menu Item Updated Successfully');
        setShowModal(false);
        setFormData(resetFormData);
         fetchMenuItems();
        console.log(response);
      }
      else {
        alert("Failed to Update Menu Item")
        setFormData(resetFormData);
        setShowModal(false);
      }
    } catch (err) {
      alert(`Failed to update menu item: ${err.message || err}`);
      setFormData(resetFormData);
      setShowModal(false);
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Menu Items</h2>
      <div className="row">
        {menuItems.map((item) => (
          <div key={item.id} className="col-md-4 d-flex justify-content-center">
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
                    Price: {item.price ? item.price : "N/A"}/-
                  </span>
                </div>
                <button
                  className="btn btn-primary w-100"
                  onClick={() => handleEditClick(item)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className='modal-backdrop-blur'>
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg mt-5">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">
                  Edit Menu Item
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <textarea
                      id="description"
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      className="form-control"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cuisineTypeId" className="form-label">
                      Cuisine Type
                    </label>
                    <select
                      id="cuisineTypeId"
                      className="form-control"
                      name="cuisineTypeId"
                      value={formData.cuisineTypeId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Cuisine Type</option>
                      {cuisines.length > 0 ? (
                        cuisines.map((cuisine) => (
                          <option key={cuisine.id} value={cuisine.id}>
                            {cuisine.cuisineName}
                          </option>
                        ))
                      ) : (
                        <option disabled>Loading cuisines...</option>
                      )}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="categoryId" className="form-label">
                      Category Type
                    </label>
                    <select
                      id="categoryId"
                      className="form-control"
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Category Type</option>
                      {categories.length > 0 ? (
                        categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.categoryName}
                          </option>
                        ))
                      ) : (
                        <option disabled>Loading categories...</option>
                      )}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      id="image"
                      className="form-control"
                      name="image"
                      onChange={handleFileChange}
                    />
                    {formData.image && (
                      <small className="form-text text-muted">
                        {formData.image.name}
                      </small>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="isAvailable" className="form-label">
                      Available
                    </label>
                    <select
                      id="isAvailable"
                      className="form-select"
                      name="isAvailable"
                      value={formData.isAvailable}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
