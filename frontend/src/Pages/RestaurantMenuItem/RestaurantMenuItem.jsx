import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateMenuItem, getCuisinesAndCategoryList, fetchMenuItemsDetail, addMenuItem, decodeparams } from '../../Helper/MenuItem';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './RestaurantMenuItem.css';

function RestaurantMenuItem() {
  const resetFormData = {
    name: '',
    description: '',
    price: '',
    cuisineTypeId: '',
    categoryId: '',
    isAvailable: 'true',
    image: null,
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(resetFormData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { restaurantId } = useParams();

  const fetchMenuItems = async () => {
    try {
      const decryptedRestaurantId = decodeparams(restaurantId);
      if (!decryptedRestaurantId) {
        throw new Error('Invalid restaurant ID');
      }
      const response = await fetchMenuItemsDetail(decryptedRestaurantId);
      if (response?.status === 200) {
        setMenuItems(response.data || []);
      } else {
        setMenuItems([]);
      }
    } catch (error) {
      setError(error.message || 'Failed to fetch menu items.');
      toast.error(`Error: ${error.message || 'Unknown error occurred'}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchCuisinesAndCategories = async () => {
    try {
      const response = await getCuisinesAndCategoryList();
      if (response.status === 200) {
        setCuisines(response.data.cuisines);
        setCategories(response.data.categories);
      } else {
        throw new Error('Failed to fetch cuisines and categories');
      }
    } catch (error) {
      toast.error(error.response?.data?.errorMessage || 'Failed to fetch cuisines and categories');
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [restaurantId]);

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
    setFormData(resetFormData);
    setIsEditMode(false);
  };

  const handleEditClick = async (item) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price || '',
      cuisineTypeId: item.cuisineTypeId || '',
      categoryId: item.categoryId || '',
      isAvailable: item.isAvailable || 'true',
      image: null,
    });
    setIsEditMode(true);
    setShowModal(true);

    await fetchCuisinesAndCategories();
  };

  const handleAddClick = async () => {
    setFormData(resetFormData);
    setIsEditMode(false);
    setShowModal(true);
    await fetchCuisinesAndCategories();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    const menuItemDetails = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== undefined && formData[key] !== null) {
        menuItemDetails.append(key, formData[key]);
      }
    });

    try {
      let response;
      const decryptedRestaurantId = decodeparams(restaurantId);
      menuItemDetails.append('restaurantId', decryptedRestaurantId);
      if (isEditMode) {
        response = await updateMenuItem(selectedItem.id, menuItemDetails);
        if (response.status === 200) {
          toast.success('Menu Item Updated Successfully');
        } else {
          throw new Error('Failed to Update Menu Item');
        }
      } else {
        response = await addMenuItem(menuItemDetails, decryptedRestaurantId);
        if (response.status === 201) {
          toast.success('Menu Item Added Successfully');
        } else {
          throw new Error('Failed to Add Menu Item');
        }
      }
      handleCloseModal();
      fetchMenuItems();
    } catch (err) {
      if (err.response.data.status === 500){
        toast.error('Failed to submit menu item. Internal server error');
      }
      toast.error(err.response?.data?.errorMessage|| 'Failed to submit menu item.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Menu Items</h2>
      <div className="row">
        <div className="col-md-4 d-flex justify-content-center">
          <div
            className="card shadow-sm p-3 mb-4 bg-white rounded d-flex justify-content-center align-items-center"
            style={{ width: '18rem', height: '400px', cursor: 'pointer' }}
            onClick={handleAddClick}
          >
            <div className="text-center">
              <i className="bi bi-plus-circle" style={{ fontSize: '4rem', color: 'gray' }}></i>
              <p className="mt-3 fw-bold">Add New Menu Item</p>
            </div>
          </div>
        </div>
        {menuItems.map((item) => (
          <div key={item.id} className="col-md-4 d-flex justify-content-center">
            <div className="card shadow-sm p-3 mb-4 bg-white rounded" style={{ width: '18rem' }}>
              <img
                src={item.imageUrl}
                alt={`Image of ${item.name}`}
                className="card-img-top rounded"
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <div className="card-body text-center">
                <h5 className="card-title mb-2">{item.name}</h5>
                <p className="card-text text-muted mb-2" style={{ fontSize: '0.9rem' }}>
                  {item.description}
                </p>
                <div className="my-3">
                  <span className="text-secondary fw-bold">Price: {item.price || 'N/A'}/-</span>
                </div>
                <button className="btn btn-primary w-100" onClick={() => handleEditClick(item)}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-backdrop-blur">
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg mt-5">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="editModalLabel">
                    {isEditMode ? 'Edit Menu Item' : 'Add New Menu Item'}
                  </h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
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
                        <option value="">Select Cuisine</option>
                        {cuisines.map((cuisine) => (
                          <option key={cuisine.id} value={cuisine.id}>
                            {cuisine.cuisineName}
                          </option>
                        ))}
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
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.categoryName}
                          </option>
                        ))}
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
                        <small className="form-text text-muted">{formData.image.name}</small>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="isAvailable" className="form-label">
                        Available
                      </label>
                      <select
                        id="isAvailable"
                        className="form-control"
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
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span  aria-hidden="true">Submitting</span>
                      ) : isEditMode ? 'Update Menu Item' : 'Add Menu Item'}
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

export default RestaurantMenuItem;
