import React, { useEffect } from "react";
import { Card, Image, ListGroup, Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../../actions/cart";

const CartItem = ({
  item: { _id, item, title, price, image, description, qty, isPerchased, date },
  removeFromCart
}) => (
  <ListGroup.Item>
    <Row>
      <Col md={2} className="mx-auto px-auto">
        <Image
          src={process.env.PUBLIC_URL + `/products/${image}`}
          style={{ width: "70%" }}
          className="mx-auto px-auto"
          rounded
        />
      </Col>
      <Col md={6}>
        <h5>{title}</h5>
        <span>
          {description}
          <br />
          <small>
            Added to cart on <Moment format="YYYY/MM/DD">{date}</Moment>
          </small>
        </span>
      </Col>
      <Col md={2}>
        <h5>
          ${price} x {qty}
        </h5>
      </Col>
      <Col md={2}>
        <Button className="btn-danger" onClick={e => removeFromCart(item)}>
          <i className="fas fa-trash"></i>
        </Button>
      </Col>
    </Row>
  </ListGroup.Item>
);

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  removeFromCart: PropTypes.func.isRequired
};

export default connect(null, { removeFromCart })(CartItem);
