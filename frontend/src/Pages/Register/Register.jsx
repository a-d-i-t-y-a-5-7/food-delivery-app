import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleRegister } from "../../Helper/RegisterHelper";
import Signup_Image from "../../assets/Signup.jfif";
import "./Register.css";

export const Register = () => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    roleId: "user",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const roleMapping = {
    user: 1004,
    "delivery-partner": 1005,
    "restaurant-owner": 1006,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      ...formData,
      roleId: roleMapping[formData.roleId],
    };

    try {
      await handleRegister(requestData);
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="outerContainer shadow-sm">
        <div className="signup-left">
          <div className="signup-form">
            <h2 className="signup-title">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  className="form-control"
                  id="name"
                  required
                  onChange={(e) =>
                    setformData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  className="form-control"
                  id="email"
                  required
                  onChange={(e) =>
                    setformData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  className="form-control"
                  id="password"
                  required
                  onChange={(e) =>
                    setformData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={formData.phoneNumber}
                  className="form-control"
                  id="phoneNumber"
                  required
                  onChange={(e) =>
                    setformData({ ...formData, phoneNumber: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <select
                  value={formData.role}
                  className="form-control"
                  id="role"
                  required
                  onChange={(e) =>
                    setformData({ ...formData, roleId: e.target.value })
                  }
                >
                  <option value="user">User</option>
                  <option value="delivery-partner">Delivery Partner</option>
                  <option value="restaurant-owner">Restaurant Owner</option>
                </select>
              </div>

              {errorMessage && (
                <div className="error-message m-2">{errorMessage}</div>
              )}
              <button type="submit" className="btn button mt-4">
                Sign Up
              </button>
              <div className="login-account">
                Already have an account?{" "}
                <Link to="/login" className="link">
                  Log in here
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="signup-right">
          <img
            src={Signup_Image}
            alt="Signup visual"
            className="signup-image"
          />
        </div>
      </div>
    </div>
  );
};
