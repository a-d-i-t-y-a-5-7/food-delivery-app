import { Button } from "antd";
import { Footer } from "antd/es/layout/layout";
import React from "react";
import "./Footer.css";

export const FooterComponent = () => {

  const navigate = useNavigate();
  const handleCategoryClick = () => {
    navigate('/addtocart'); 
  };

  return (
    <Footer
      className="footerContainer"
      style={{
        backgroundImage: "linear-gradient(to right, rgb(242,169,62), rgb(240,112,84))",
        padding: "5px 0",
      }}
    >
      <Container>
        <Row className="text-center mt-4">
          <Col>
            <h3 className="fw-bold text-white">Swigato : Online Ordering Website</h3>
            <p className="text-white">
              Your favorite meals delivered to your doorsteps with ease and speed!
            </p>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <Button             
              className="order-button"
              onClick={handleCategoryClick}
              size="lg"
            >
              Order Now
            </Button>
          </Col>
        </Row>
      </Container>
    </Footer>
  );
};
