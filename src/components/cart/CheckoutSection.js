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
    <Card className="shadow">
      <Card.Body>
        <Row>
          <Col md={8}></Col>
          <Col className="align-middle" md={2}>
            <h5 className="mt-1">Total ${formData.total}</h5>
          </Col>
          <Col md={2}>
            <Button className="btn-custom-1">
              Checkout <i className="fas fa-shopping"></i>
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

CheckoutSection.propTypes = {
  products: PropTypes.object.isRequired
};

export default CheckoutSection;
