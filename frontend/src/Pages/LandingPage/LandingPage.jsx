import React, { useState } from "react";
import {
  FaTruck,
  FaLocationArrow,
  FaCreditCard,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ImageRow from "../../Components/LandingPage/ImageRow";

const LandingPage = () => {
  const items = [
    { img: "/assets/Categories/Coffee.jpg", name: "Coffee" },
    { img: "/assets/Categories/Burger.jpg", name: "Burger" },
    { img: "/assets/Categories/Bread.jpg", name: "Sandwich" },
    { img: "/assets/Categories/Pasta.jpg", name: "Pasta" },
    { img: "/assets/Categories/Pizza.jpg", name: "Pizza" },
    { img: "/assets/Categories/Muffin.jpg", name: "Muffin" },
    { img: "/assets/Categories/Paneer.jpg", name: "Paneer" },
    { img: "/assets/Categories/Chicken.jpg", name: "Chicken" },
    { img: "/assets/Categories/Sushi.jpg", name: "Sushi" },
    { img: "/assets/Categories/salad.jpg", name: "Salad" },
    { img: "/assets/Categories/Momo.jpg", name: "Momo" },
    { img: "/assets/Categories/Biryani.jpg", name: "Biryani" },
    { img: "/assets/Categories/Paratha Rolls.jpg", name: "Paratha Rolls" },
    { img: "/assets/Categories/Icecream.jpg", name: "Icecream" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentIndex + 6 < items.length) {
      setCurrentIndex(currentIndex + 6);
    }
  };

  const handlePrev = () => {
    if (currentIndex - 6 >= 0) {
      setCurrentIndex(currentIndex - 6);
    }
  };

  const currentItems = items.slice(currentIndex, currentIndex + 6);
  const handleCategoryClick = () => {
    navigate("/home");
  };

  const categoryImages = currentItems.map((item) => ({
    img: item.img,
    alt: item.name,
    onClick: handleCategoryClick,
  }));

  const dealsImages = [
    {
      img: "/assets/Offers/Offer1.jpg",
      alt: "offer",
      onClick: handleCategoryClick,
    },
    {
      img: "/assets/Offers/Offer2.jpg",
      alt: "foodoffer",
      onClick: handleCategoryClick,
    },
    {
      img: "/assets/Offers/Offer3.jpg",
      alt: "freeoffer",
      onClick: handleCategoryClick,
    },
    {
      img: "/assets/Offers/Offer4.jpg",
      alt: "freeoffer",
      onClick: handleCategoryClick,
    },
  ];

  const cafesImages = [
    {
      img: "/assets/Cafes/Cafe1.jpg",
      alt: "cafe1",
      onClick: handleCategoryClick,
    },
    {
      img: "/assets/Cafes/Cafe2.jpg",
      alt: "cafe3",
      onClick: handleCategoryClick,
    },
    {
      img: "/assets/Cafes/Cafe3.jpg",
      alt: "cafe2",
      onClick: handleCategoryClick,
    },
    {
      img: "/assets/Cafes/Cafe4.jpg",
      alt: "cafe2",
      onClick: handleCategoryClick,
    },
  ];

  const rooftopImages = [
    {
      img: "/assets/RoofTops/RoofTop1.jpg",
      alt: "rooftop1",
      onClick: handleCategoryClick,
    },
    {
      img: "/assets/RoofTops/RoofTop2.jpg",
      alt: "rooftop2",
      onClick: handleCategoryClick,
    },
    {
      img: "/assets/RoofTops/RoofTop3.jpg",
      alt: "rooftop3",
      onClick: handleCategoryClick,
    },
    {
      img: "/assets/RoofTops/RoofTop4.jpg",
      alt: "rooftop3",
      onClick: handleCategoryClick,
    },
  ];

  const features = [
    { icon: <FaTruck className="me-2" size={20} />, text: "Fast Delivery" },
    {
      icon: <FaLocationArrow className="me-2" size={20} />,
      text: "Live Tracking",
    },
    {
      icon: <FaCreditCard className="me-2" size={20} />,
      text: "Hassle-free Payment",
    },
  ];

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
        <ImageRow iconRow={features} />
      </div>

      <div className="w-100 text-center mt-3">
        <h2 className="text-left mb-4">Categories</h2>
        <div className="w-100 d-flex justify-content-center align-items-center mt-3">
          <FaArrowLeft
            className="me-2"
            size={30}
            style={{ cursor: "pointer" }}
            onClick={handlePrev}
          />
          <div className="d-flex" style={{ width: "65%" }}>
            {categoryImages.map((item, index) => (
              <div key={index} className="text-center mx-4">
                <img
                  src={item.img}
                  alt={item.alt}
                  className="rounded-circle mb-2"
                  style={{
                    width: "120px",
                    height: "100px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={item.onClick}
                />
                <p className="mb-0 fw-bold">{item.alt}</p>
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

      <ImageRow title="Today's Deals" images={dealsImages} />
      <ImageRow title="Popular Cafe's" images={cafesImages} />
      <ImageRow title="Popular Rooftop Restaurant's" images={rooftopImages} />
    </div>
  );
};

export default LandingPage;
