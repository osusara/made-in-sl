import React, { Fragment, useEffect } from "react";
import { Container, Card, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProduct } from "../../actions/product";

import Spinner from "../layout/Spinner";

const ProductView = ({ getProduct, product: { product, loading }, match }) => {
  useEffect(() => {
    getProduct(match.params.id);
  }, [getProduct]);

  return loading || product === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Container>
        <Card className="products-container my-5">
          <Card.Body>
            <Row>
              <Col md={4} xs={12}>
                <Image
                  src={process.env.PUBLIC_URL + `/products/${product.image}`}
                  style={{ width: "100%" }}
                  className="product-image"
                />
              </Col>
              <Col md={8} xs={12}>
                <Card.Title>
                  <h1 class="text-color-1">{product.title}</h1>
                </Card.Title>
                <br />
                <Card.Text>
                  <p className="mb-5">
                    {product.description}
                    <br />
                    <small style={{ color: "#777777" }}>
                      Product ID: {product._id}
                      <br />
                      Posted On:{" "}
                      <Moment format="YYYY/MM/DD">
                        {product.date}
                      </Moment> By{" "}
                      <img src={product.avatar} style={{ height: "15px" }} />{" "}
                      {product.name}
                    </small>
                  </p>

                  <h4 className="text-color-1">
                    ${product.price}{" "}
                    <Link
                      to={`/products/cart/${product._id}`}
                      className="btn btn-custom-1 mx-auto"
                    >
                      Add to Cart <i className="fas fa-shopping-cart"></i>
                    </Link>
                  </h4>
                </Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Link to="/products" className="btn btn-custom-2 mx-1 my-1">
          Go Back to Products
        </Link>
      </Container>
    </Fragment>
  );
};

ProductView.propTypes = {
  getProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps, { getProduct })(ProductView);
