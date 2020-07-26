import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Card, Button, Row, Col } from "react-bootstrap";
import { addOrder } from "../../actions/order";
import { deleteCart } from "../../actions/cart";
import { connect } from "react-redux";

const CheckoutSection = ({ deleteCart, addOrder, getPrice, customerOrder: { user, products } }) => {
  useEffect(() => {
    setFormData({
      total: getPrice(),
      user,
      products,
    });
  }, [getPrice]);

  const [formData, setFormData] = useState({
    user: "",
    products: [],
    total: 0
  });

  const checkOut =  e => {
    addOrder(formData);
    deleteCart();
  }

  return (
    <Card className="shadow mt-5" style={{ borderRadius: "1rem" }}>
      <Card.Body>
        <Row>
          <Col md={8}></Col>
          <Col className="align-middle" md={2}>
            <h3 className="mt-1">Total ${formData.total}</h3>
          </Col>
          <Col md={2}>
            <Button className="btn-custom-1 btn-lg" onClick={e => checkOut()}>
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
  getPrice: PropTypes.func.isRequired,
  addOrder: PropTypes.func.isRequired,
  deleteCart: PropTypes.func.isRequired,
};

export default connect(null, { addOrder, deleteCart })(CheckoutSection);
