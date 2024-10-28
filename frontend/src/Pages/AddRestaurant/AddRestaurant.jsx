import React, { useState } from 'react';
import axios from 'axios';

function AddRestaurant() {
    const resetFormData = {
        Name: '',
        PhoneNumber: '',
        StreetAddress: '',
        AdditionalAddress: '',
        City: '',
        State: '',
        Pincode: '',
        OpeningTime: '',
        ClosingTime: ''
    };

    const [formData, setFormData] = useState(resetFormData);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.Name.trim()) newErrors.Name = 'Restaurant Name is required';
        if (!/^\d{10}$/.test(formData.PhoneNumber)) newErrors.PhoneNumber = 'Phone must be a 10-digit number';
        if (!formData.StreetAddress.trim()) newErrors.StreetAddress = 'Street Address is required';
        if (!formData.AdditionalAddress.trim()) newErrors.AdditionalAddress = 'Apartment/Unit Number is required';
        if (!formData.City.trim()) newErrors.City = 'City Name is required';
        if (!formData.State.trim()) newErrors.State = 'State Name is required';
        if (!/^\d{6}$/.test(formData.Pincode)) newErrors.Pincode = 'Pincode must be a 6-digit number';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validate();
        if (Object.keys(validationError).length > 0) {
            setErrors(validationError);
            return;
        }

        const restaurantData = {
            OwnerId: 1,
            Name: formData.Name,
            PhoneNumber: formData.PhoneNumber,
            StreetAddress: formData.StreetAddress,
            AdditionalAddress: formData.AdditionalAddress,
            City: formData.City,
            State: formData.State,
            PinCode: formData.Pincode,
            OpeningTime: new Date(
                new Date().setHours(
                    parseInt(formData.OpeningTime.split(':')[0], 10),
                    parseInt(formData.OpeningTime.split(':')[1], 10),
                    0,
                    0
                )
            ).toISOString(),
            ClosingTime: new Date(
                new Date().setHours(
                    parseInt(formData.ClosingTime.split(':')[0], 10),
                    parseInt(formData.ClosingTime.split(':')[1], 10),
                    0,
                    0
                )
            ).toISOString(),
        };
        try {
            
           const response = await axios.post("https://localhost:44357/api/Restaurant/Register", restaurantData);
            setFormData(resetFormData);
            setErrors({});
        } catch (error) {
            console.error('Error creating restaurant:', error);
            alert('Failed to add restaurant. Please try again.');
        }
    }
    const handleFocus = (e) => {
        const { name } = e.target;
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    return (
        <div className='newRestaurant-container'>
            <div className="container mt-5">
                <div className="border rounded p-4 shadow">
                    <h2 className="text-center mb-4">Add New Restaurant</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="Name" className="font-weight-bold">Name</label>
                            <input
                                type="text"
                                id="Name"
                                name="Name"
                                value={formData.Name}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                className="form-control"
                                required
                            />
                            {errors.Name && <small className="form-text text-danger">{errors.Name}</small>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="PhoneNumber" className="font-weight-bold">Phone Number</label>
                            <input
                                type="text"
                                id="PhoneNumber"
                                name="PhoneNumber"
                                value={formData.PhoneNumber}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                className="form-control"
                                required
                            />
                            {errors.PhoneNumber && <small className="form-text text-danger">{errors.PhoneNumber}</small>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="StreetAddress" className="font-weight-bold">Street Address</label>
                            <input
                                type="text"
                                id="StreetAddress"
                                name="StreetAddress"
                                value={formData.StreetAddress}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                className="form-control"
                                required
                            />
                            {errors.StreetAddress && <small className="form-text text-danger">{errors.StreetAddress}</small>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="AdditionalAddress" className="font-weight-bold">Apartment/Unit Number</label>
                            <input
                                type="text"
                                id="AdditionalAddress"
                                name="AdditionalAddress"
                                value={formData.AdditionalAddress}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                className="form-control"
                            />
                            {errors.AdditionalAddress && <small className="form-text text-danger">{errors.AdditionalAddress}</small>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="State" className="font-weight-bold">State</label>
                            <input
                                type="text"
                                id="State"
                                name="State"
                                value={formData.State}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                className="form-control"
                                required
                            />
                            {errors.State && <small className="form-text text-danger">{errors.State}</small>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="City" className="font-weight-bold">City</label>
                            <input
                                type="text"
                                id="City"
                                name="City"
                                value={formData.City}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                className="form-control"
                                required
                            />
                            {errors.City && <small className="form-text text-danger">{errors.City}</small>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="Pincode" className="font-weight-bold">Pincode</label>
                            <input
                                type="text"
                                id="Pincode"
                                name="Pincode"
                                value={formData.Pincode}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                className="form-control"
                                required
                            />
                            {errors.Pincode && <small className="form-text text-danger">{errors.Pincode}</small>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="OpeningTime" className="font-weight-bold">Opening Time</label>
                            <input
                                type="time"
                                id="OpeningTime"
                                name="OpeningTime"
                                value={formData.OpeningTime}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="ClosingTime" className="font-weight-bold">Closing Time</label>
                            <input
                                type="time"
                                id="ClosingTime"
                                name="ClosingTime"
                                value={formData.ClosingTime}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary mt-4">
                                Add Restaurant
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddRestaurant;
