import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  
  return (
    <Container fluid="true" className="footer shadow-sm py-4">
      <Row>
        <Col md={4} lg={4} sm={12} className="text-center px-4">
          <h4>Our Mission</h4>
          <hr style={{ width: "50%" }} />
          <label>
            "Open the Sri Lankan products to the world and
            spread the Sri Lankan name around the world"
          </label>
        </Col>
        <Col md={4} lg={4} sm={12} className="text-center px-4">
          <h4>Contact Us</h4>
          <hr style={{ width: "50%" }} />
          <label className="text-color-1">011 234 5678</label>
          <br />
          <label className="text-color-1">info@madeinsl.com</label>
          <br />
          <label className="text-color-1">
            45, Main Street, Colombo 03, Sri Lanka
          </label>
        </Col>
        <Col md={4} lg={4} sm={12} className="text-center px-4">
          <h4>Find Us On</h4>
          <hr style={{ width: "50%" }} />
          <a href="https://facebook.com/" target="_blank" className="mx-3">
            <i className="fab fa-facebook fa-2x text-color-1"></i>
          </a>
          <a href="https://twitter.com/" target="_blank" className="mx-3">
            <i className="fab fa-twitter fa-2x text-color-1"></i>
          </a>
          <a href="https://instagram.com/" target="_blank" className="mx-3">
            <i className="fab fa-instagram fa-2x text-color-1"></i>
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
