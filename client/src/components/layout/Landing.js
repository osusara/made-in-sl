import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const Landing = () => {
  return (
    <section className="landing-background">
      <Container style={{ height: "100%" }} className="mx-auto">
        <Row style={{ height: "100%" }} className="text-center">
          <Col md={10} lg={8} className="mx-auto">
            <div className="landing-hero">
              <h1 className="landing-title">Made In Sri Lanka</h1>
              <p className="landing-text">
                Buy the finest products made in Sri Lanka for low price and in
                best quality. Only on Made in Sri Lanka, the world's online
                marketplace.
              </p>
              <Link to="/login" className="btn btn-custom-1 px-4 mx-1">
                Login
              </Link>
              <span>or</span>
              <Link to="/register" className="btn btn-outline-dark btn-custom-2 px-3 mx-1">
                Sign Up
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Landing;
