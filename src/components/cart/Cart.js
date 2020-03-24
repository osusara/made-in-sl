import React, { useEffect } from "react";
import { Container, Card, ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCart } from "../../actions/cart";
import Spinner from "../layout/Spinner";
import CartItem from "./CartItem";
import CheckoutSection from "./CheckoutSection";
import CartEmpty from "./CartEmpty";

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
    <Container fluid={true} className="register-background user-foreground py-4">
        {items === null ? (<CartEmpty />) : (
          items.products.length === 0 ? (<CartEmpty />) : (
            <Container>
              <CheckoutSection products={items.products} getPrice={getPrice} />

              <Card style={{borderRadius: "1rem"}} className="shadow mb-5 mt-4">
                <Card.Body>
                  <ListGroup>
                    {items.products.map(item => (
                      <CartItem key={item._id} item={item} />
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Container>
          )
        )}
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
