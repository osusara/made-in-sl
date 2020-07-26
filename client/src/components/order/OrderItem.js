import React, {Fragment} from "react";
import { Image, ListGroup, Row, Col, Card, Container, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";

import { deliveredOrder } from "../../actions/order";

const OrderItem = ({deliveredOrder, item: { user, _id, date, delivered, total, products }}) => {
  return (
    <Fragment>
      {products === null ? (
        <h6>Empty order</h6>
      ) : products.length === 0 ? (
        <h6>Empty order</h6>
      ) : (
        <Container>
          <Card style={{ borderRadius: "1rem" }} className="shadow-sm mb-4 mt-4 bg-light">
            <Card.Body>
              <Row className="mb-2">
                <Col md={7}>
                  <small>
                    Order ID {_id}<br />
                    Checked out on{" "}
                    <Moment format="YYYY/MM/DD">{date}</Moment>
                  </small>
                </Col>
                <Col md={2}>
                  <h5 className="my-auto float-right">Total ${total}</h5>
                </Col>
                <Col md={3}>
                  {delivered ? (
                    <h5 className="text-success text-center">
                      <i className="fas fa-check-circle"></i> Delivered 
                    </h5>
                  ) : (
                    <Button className="btn-secondary btn-custom-2 text-center mx-auto" onClick={e => deliveredOrder(_id)}>
                      Mark as Delivered
                    </Button>
                  )}
                </Col>
              </Row>
              <ListGroup>
                {products.map(product => (
                  <ListGroup.Item>
                    <Row>
                      <Col md={2} className="mx-auto px-auto">
                        <Image
                          src={process.env.PUBLIC_URL +`/products/${product.image}`}
                          style={{ width: "70%" }}
                          className="mx-auto px-auto"
                          rounded
                        />
                      </Col>
                      <Col md={4}>
                        <div className="my-3">
                          <h5>{product.title}</h5>
                          <small className="text-secondary">
                            Product ID {product._id}
                          </small>
                        </div>
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
  item: PropTypes.object.isRequired,
  deliveredOrder: PropTypes.func.isRequired,
};

export default connect(null, { deliveredOrder })(OrderItem);
