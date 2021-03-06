import React, { Fragment, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProducts } from "../../actions/product";
import ProductItem from "./ProductItem";

const Products = ({ getProducts, product: { products, loading }, category }) => {
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <Container className="my-5">
        <h1 className="landing-title" style={{fontSize: "1.5rem"}}>{category} Products</h1>
        <p className="landing-text" style={{fontSize: "1rem"}}>
          One of the region’s most vibrant export hubs, Sri Lanka is equally
          competent in agriculture, manufacturing and service sector. The rest
          of the world has the opportunity to benefit from the country’s
          collective competitive advantage through sourcing from Sri Lanka.
        </p>
      </Container>

      <Container fluid={true} className="products px-4">
        <div className="my-5 py-4 px-5 products-category products-container">
          <Row>
            {products.map(product =>
              product.category === category ? (
                <Col md={3} xs={4} className="my-3">
                  <ProductItem key={product._id} product={product} />
                </Col>
              ) : (
                <Fragment></Fragment>
              )
            )}
          </Row>
        </div>
      </Container>
    </div>
  );
};

Products.propTypes = {
  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps, { getProducts })(Products);
