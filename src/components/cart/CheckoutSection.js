import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Button, Row, Col } from "react-bootstrap";

const CheckoutSection = ({ getPrice, products }) => {
  useEffect(() => {
    setFormData({ total: getPrice()});
  }, [getPrice]);

  const [formData, setFormData] = useState({
    total: 0
  });

  return (
    <Card className="shadow mt-5" style={{ borderRadius: "1rem" }}>
      <Card.Body>
        <Row>
          <Col md={8}></Col>
          <Col className="align-middle" md={2}>
            <h3 className="mt-1">Total ${formData.total}</h3>
          </Col>
          <Col md={2}>
            <Button className="btn-custom-1 btn-lg">
              Checkout <i className="fas fa-shopping-bag"></i>
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

CheckoutSection.propTypes = {
  products: PropTypes.object.isRequired,
  getPrice: PropTypes.func.isRequired
};

export default CheckoutSection;
