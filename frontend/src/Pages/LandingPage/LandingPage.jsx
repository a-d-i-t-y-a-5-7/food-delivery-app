import React, { useState } from "react";
import { FaTruck, FaLocationArrow, FaCreditCard, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const LandingPage = () => {
  const items = [
    { img: "/assets/Coffee.jpg", name: "Coffee" },
    { img: "/assets/Burger.jpg", name: "Burger" },
    { img: "/assets/Bread.jpg", name: "Sandwich" },
    { img: "/assets/Pasta.jpg", name: "Pasta" },
    { img: "/assets/Pizza.jpg", name: "Pizza" },
    { img: "/assets/Muffin.jpg", name: "Muffin" },
    { img: "/assets/Paneer.jpg", name: "Paneer" },
    { img: "/assets/Chicken.jpg", name: "Chicken" },
    { img: "/assets/Sushi.jpg", name: "Sushi" },
    { img: "/assets/salad.jpg", name: "Salad" },
    { img: "/assets/Momo.jpg", name: "Momo" },
    { img: "/assets/Biryani.jpg", name: "Biryani" },
    { img: "/assets/Paratha Rolls.jpg", name: "Paratha Rolls" },
    { img: "/assets/Icecream.jpg", name: "Icecream" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex + 7 < items.length) {
      setCurrentIndex(currentIndex + 7);
    }
  };

  const handlePrev = () => {
    if (currentIndex - 7 >= 0) {
      setCurrentIndex(currentIndex - 7);
    }
  };

  const currentItems = items.slice(currentIndex, currentIndex + 7);

  return (
    <div className="d-flex justify-content-center align-items-center w-100 flex-column">
      <div
        className="text-center p-4 text-white rounded shadow w-100"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(242,169,62), rgb(240,112,84))",
        }}
      >
        <h1 className="fw-bold display-3">Swigato</h1>
        <p className="lead">Order your most favourite food dishes today! 😋</p>
        <div className="d-flex justify-content-center mt-4">
          <div
            className="d-flex text-center p-3 bg-gradient text-dark rounded shadow mx-2"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(242,169,62), rgb(240,112,84))",
            }}
          >
            <FaTruck className="me-2" size={20} />
            <p className="mb-0 fw-bold">Fast Delivery</p>
          </div>
          <div
            className="d-flex text-center p-3 bg-gradient text-dark rounded shadow mx-2"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(242,169,62), rgb(240,112,84))",
            }}
          >
            <FaLocationArrow className="me-2" size={20} />
            <p className="mb-0 fw-bold">Live Tracking</p>
          </div>
          <div
            className="d-flex text-center p-3 bg-gradient text-dark rounded shadow mx-2"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(242,169,62), rgb(240,112,84))",
            }}
          >
            <FaCreditCard className="me-2" size={20} />
            <p className="mb-0 fw-bold">Hassle-free Payment</p>
          </div>
        </div>
        <div className="w-100 text-center mt-4">
          <p className="text-dark lead" style={{ fontSize: "1.25rem" }}>
            Discover restaurants that deliver near you
          </p>
        </div>
      </div>
      <div className="w-100 text-center mt-3">
        <h2 className="fw-bold">Categories</h2>
        <div className="w-100 d-flex justify-content-center align-items-center mt-3">
        <FaArrowLeft
          className="me-2"
          size={30}
          style={{ cursor: "pointer" }}
          onClick={handlePrev}
        />
        <div className="d-flex" style={{ width: "80%" }}>
          {currentItems.map((item, index) => (
            <div key={index} className="text-center mx-4">
              <img
                src={item.img}
                alt={item.name}
                className="rounded-circle mb-2"
                style={{ width: "120px", height: "100px", objectFit: "cover" }}
              />
              <p className="mb-0 fw-bold">{item.name}</p>
            </div>
          ))}
        </div>
        <FaArrowRight
          className="ms-2"
          size={30}
          style={{ cursor: "pointer" }}
          onClick={handleNext}
        />
        </div>
      </div>     
      <div className="w-100 text-center mt-5">
        <h2 className="fw-bold">Collections</h2>
        <div className="d-flex justify-content-center mt-4">
          <div className="text-center mx-3">
            <img
              src="/assets/Offer.jpg"
              alt="Pizza"
              className="rounded mb-2"
              style={{ width: "300px", height: "250px", objectFit: "cover" }}
            />
          </div>
          <div className="text-center mx-3">
            <img
              src="/assets/FoodOffer.jpg"
              alt="Sushi"
              className="rounded mb-2"
              style={{ width: "400px", height: "250px", objectFit: "cover" }}
            />
          </div>
          <div className="text-center mx-3">
            <img
              src="/assets/FreeOffer.jpg"
              alt="Sushi"
              className="rounded mb-2"
              style={{ width: "300px", height: "250px", objectFit: "cover" }}
            />
          </div>
          </div>
      </div>
    </div>
  );
};

export default LandingPage;
