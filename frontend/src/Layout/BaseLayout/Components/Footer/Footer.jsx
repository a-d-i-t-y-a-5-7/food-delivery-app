import { Button } from "antd";
import { Footer } from "antd/es/layout/layout";
import React from "react";
import "./Footer.css";

export const FooterComponent = () => {
  return (
    <Footer className="footerContainer">
      <div className="sticky-footer">
        <Button
          type="primary"
          className="order-button"
          onClick={() => alert("Redirecting to Cart...")}
        >
          Order Now
        </Button>
      </div>
    </Footer>
  );
};
