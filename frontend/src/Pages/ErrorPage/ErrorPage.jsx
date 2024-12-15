import React from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.css";

export const ErrorPage = ({ errorCode, errorMessage }) => {
  const renderErrorMessage = (code) => {
    switch (code) {
      case 404:
        return "Page Not Found!";
      case 500:
        return "Internal Server Error!";
      case 403:
        return "Forbidden!";
      case 400:
        return "Bad Request!";
      default:
        return "Something went wrong!";
    }
  };

  return (
    <div className="error-page-container">
      <div className="error-code">
        <h1>{errorCode || 404}</h1>
      </div>
      <div className="error-message">
        <h2>{errorMessage || renderErrorMessage(errorCode)}</h2>
      </div>
      <div className="home-link">
        <Link to="/">Go to Homepage</Link>
      </div>
    </div>
  );
};
