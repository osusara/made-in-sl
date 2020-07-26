import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import RecentProducts from "../product/RecentProducts";

const Landing = () => {
  return (
    <section className="landing-background">
      <Container className="mx-auto">
        <Row className="text-center">
          <Col md={10} lg={8} className="mx-auto">
            <div className="mt-5">
              <h1 className="landing-title">Made In Sri Lanka</h1>
              <p className="landing-text">
                Buy the finest products made in Sri Lanka for low price and in
                best quality. Only on Made in Sri Lanka, the world's online
                marketplace.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      
      <RecentProducts />
    </section>
  );
};

export default Landing;
