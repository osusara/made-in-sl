import React from "react";
import { Container, Card } from "react-bootstrap";

const CartEmpty = () => {

  return (
    <Container>
      <Card style={{ borderRadius: "1rem" }} className="mx-5 shadow-sm">
        <Card.Body>
          <Card.Text className="text-center">
            <h2 className="text-dark">Your cart is empty!</h2>
            <p className="text secondary">
              Browse the top quality Sri Lankan products and add them to cart.
              <br />
              Then you can checkout them.
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CartEmpty;
