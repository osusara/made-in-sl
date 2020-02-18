import React, { useEffect } from "react";
import { Container, Card, ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCart } from "../../actions/cart";
import Spinner from "../layout/Spinner";
import CartItem from "./CartItem";
import CheckoutSection from "./CheckoutSection"

const Cart = ({ getCart, cart: { items, loading } }) => {
  useEffect(() => {
    getCart();
  }, [getCart]);

  const getPrice = () => {
    let totalPrice = 0;
    items.products.forEach(item => {
      totalPrice += item.price * item.qty;
    });

    return totalPrice;
  };

  return loading ? (
    <Spinner />
  ) : (
    <Container>
      <CheckoutSection products={items.products} getPrice={getPrice} />

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
