import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function AddMenuItem() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cuisines, setCuisines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    cuisineTypeId: '',
    categoryId: '',
    isAvailable: 'true',
    image: null,
  });

  useEffect(() => {
    const fetchCuisineAndCategories = async () => {
      try {
        const response = await axios.get('https://localhost:44357/api/FoodItem/GetListOfCuisineAndCategory');
        setCuisines(response.data.cuisines);
        setCategories(response.data.categories);
      } catch (err) {
        setError(`Failed to fetch cuisine and category data: ${err.message || err}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCuisineAndCategories();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('restaurantId', 1);
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('price', formData.price);
    formDataToSubmit.append('cuisineTypeId', formData.cuisineTypeId);
    formDataToSubmit.append('categoryId', formData.categoryId);
    formDataToSubmit.append('isAvailable', formData.isAvailable);
    if (formData.image) {
      formDataToSubmit.append('image', formData.image);
    }

    try {
      const response = await axios.post('https://localhost:44357/api/FoodItem/AddmenuItem/1', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      setFormData({
        name: '',
        description: '',
        price: '',
        cuisineTypeId: '',
        categoryId: '',
        isAvailable: 'true',
        image: null,
      });

      alert('Menu item added successfully!');
    } catch (err) {
      if (err.response) {
        setError(`Failed to add new menu item: ${err.response.data.errorMessage || err.message}`);
        console.error('Error Response:', err.response.data);
      } else {
        setError(`Failed to add new menu item:- ${err.message}`);
        console.error('Error:', err.message);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add New Menu Item</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="shadow p-4 rounded bg-light">
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">Name</label>
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

          <div className="col-md-6">
            <label htmlFor="price" className="form-label">Price (INR)</label>
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
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="cuisineTypeId" className="form-label">Cuisine Type</label>
            <select
              id="cuisineTypeId"
              className="form-select"
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

          <div className="col-md-6">
            <label htmlFor="categoryId" className="form-label">Category Type</label>
            <select
              id="categoryId"
              className="form-select"
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
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Upload Image</label>
          <input
            type="file"
            id="image"
            className="form-control"
            name="image"
            onChange={handleFileChange}
            required
          />
          {formData.image && <small className="form-text text-muted">{formData.image.name}</small>}
        </div>

        <div className="mb-3">
          <label htmlFor="isAvailable" className="form-label">Available</label>
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

        <button type="submit" className="btn btn-primary w-100 py-2">Add Menu Item</button>
      </form>
    </div>
  );
}

export default AddMenuItem;
