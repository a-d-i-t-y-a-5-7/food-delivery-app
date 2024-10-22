import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { apiLogin } from "./Helper";

export const Login = () => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiLogin(formData);
      console.log("Login successful:", response);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="outerContainer shadow-sm">
        <div className="login-left">
          <div className="login-form">
            <h2 className="login-title">Log In</h2>
            <form onSubmit={handleSubmit}>
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
              {errorMessage && (
                <div className="error-message m-2">{errorMessage}</div>
              )}
              <button type="submit" className="btn button mt-4">
                Log In
              </button>
              <div className="create-account">
                No account?{" "}
                <Link to="/register" className="link">
                  Create one
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="login-right">
          <img
            src="https://via.placeholder.com/600x800"
            alt="Login visual"
            className="login-image"
          />
        </div>
      </div>
    </div>
  );
};
