import React, {Fragment} from "react";
import { Image, ListGroup, Row, Col, Card, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import Moment from "react-moment";

const OrderItem = ({item: { user, total, products }}) => {
  return (
    <Fragment>
      {products === null ? (
        <h6>Empty order</h6>
      ) : products.length === 0 ? (
        <h6>Empty order</h6>
      ) : (
        <Container>
          <Card style={{ borderRadius: "1rem" }} className="shadow-sm mb-4 mt-4">
            <Card.Body>
              <ListGroup>
                {products.map(product => (
                  <ListGroup.Item>
                    <Row>
                      <Col md={2} className="mx-auto px-auto">
                        <Image
                          src={
                            process.env.PUBLIC_URL +
                            `/products/${product.image}`
                          }
                          style={{ width: "70%" }}
                          className="mx-auto px-auto"
                          rounded
                        />
                      </Col>
                      <Col md={4}>
                        <h5>{product.title}</h5>
                        <span>
                          <small className="text-secondary">
                            Checked out on{" "}
                            <Moment format="YYYY/MM/DD">{product.date}</Moment>{" "}
                            <br />
                            Order No {product._id}
                          </small>
                        </span>
                      </Col>
                      <Col md={2}>
                        <div className="my-3">
                          <h5 className="text-center">
                            <h6 className="text-center">Unit Price</h6>$
                            {product.price}
                          </h5>
                        </div>
                      </Col>
                      <Col md={1}>
                        <div className="my-3">
                          <h5 className="text-center">
                            <h6 className="text-center">Qty</h6>
                            {product.qty}
                          </h5>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="my-3">
                          <h5 className="text-center">
                            <h6 className="text-center">Sub Total</h6>$
                            {product.price * product.qty}
                          </h5>
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Container>
      )}
    </Fragment>
  );
};

OrderItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default OrderItem;
