import React, { useState } from "react";
import {
  Image,
  ListGroup,
  Row,
  Col,
  Button,
  FormControl,
} from "react-bootstrap";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { removeFromCart } from "../../actions/cart";
import { addToCart } from "../../actions/cart";

const CartItem = ({
  item: { _id, item, title, price, image, description, qty, isPerchased, date },
  removeFromCart,
  addToCart
}) => {
  const [formData, setFormData] = useState({
    qty
  });

  const onChange = e => setFormData({ qty: e.target.value });

  return (
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
        <Col md={4}>
          <h5>{title}</h5>
          <span>
            {description}
            <br />
            <small className="text-secondary">
              Added to cart on <Moment format="YYYY/MM/DD">{date}</Moment>{" "}
              <br />
              Order No {_id}
            </small>
          </span>
        </Col>
        <Col md={2}>
          <div className="my-3">
            <h5 className="text-center">
              <h6 className="text-center">Unit Price</h6>${price}
            </h5>
          </div>
        </Col>
        <Col md={1}>
          <div className="my-3">
            <h5 className="text-center">
              <h6 className="text-center">Qty</h6>
              <Row>
                <Col md={8}>
                  <FormControl
                    className="text-center form-control-sm cart-qty-col"
                    name="qty"
                    value={formData.qty}
                    onChange={e => onChange(e)}
                  />
                </Col>
                <Col
                  md={4}
                  style={{
                    marginLeft: "0",
                    marginRight: "0",
                    paddingLeft: "0",
                    paddingRight: "0"
                  }}
                >
                  <button
                    className="btn btn-dark btn-sm"
                    onClick={e => addToCart(item, formData)}
                    style={{
                      width: "100%",
                      marginLeft: "0",
                      marginRight: "0",
                      paddingLeft: "0",
                      paddingRight: "0"
                    }}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </Col>
              </Row>
            </h5>
          </div>
        </Col>
        <Col md={2}>
          <div className="my-3">
            <h5 className="text-center">
              <h6 className="text-center">Sub Total</h6>${price * qty}
            </h5>
          </div>
        </Col>
        <Col md={1} className="text-center align-middle">
          <Button
            className="btn-danger my-3"
            onClick={e => removeFromCart(item)}
          >
            <i className="fas fa-trash"></i>
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired
};

export default connect(null, { removeFromCart, addToCart })(CartItem);
