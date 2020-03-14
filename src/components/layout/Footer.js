import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  
  return (
    <Container fluid="true" className="footer shadow-sm py-4">
      <Row>
        <Col md={4} lg={4} sm={12} className="text-center px-1">
          wwwwwwwwwwwwwwwwwwwwwwwww
        </Col>
        <Col md={4} lg={4} sm={12} className="text-center px-1">
          <p>
            wwwwwwwwwwwwwwww wwwwwwwwwwwwwwwwww
            <br />
            wwwwwwwwwwwwwwwwwwwwww
          </p>
        </Col>
        <Col md={4} lg={4} sm={12} className="text-center px-1">
          <p>
            wwwwwwwwwwwwwwww wwwwwwwwwwwwwwwwww
            <br />
            wwwwwwwwwwwwwwwwwwwwww
          </p>
        </Col>
      </Row>
      <hr />
      <Row className="text-center">
        <Col>
          <span className="text-center text-dark">
            &copy; Made in Sri Lanka | 2020
          </span>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
