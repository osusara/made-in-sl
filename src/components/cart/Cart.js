import React, { useEffect, Fragment } from "react";
import { Container, Card, ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCart } from "../../actions/cart";
import Spinner from "../layout/Spinner";
import CartItem from "./CartItem";

const Cart = ({ getCart, cart: { items, loading } }) => {
  useEffect(() => {
    getCart();
  }, [getCart]);

  return loading ? (
    <Spinner />
  ) : (
    <Container>
      <Card className="shadow my-5">
        <Card.Body>
          <ListGroup>
            {items.products.map(item => (
              <CartItem key={item._id} item={item} />
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

Cart.propTypes = {
  getCart: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cart: state.cart
})

export default connect(mapStateToProps, { getCart })(Cart);
