import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProducts } from "../../actions/product";
import Spinner from "../layout/Spinner";
import ProductItem from "./ProductItem";

const Products = ({ getProducts, product: { products, loading } }) => {
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return loading ? (
    <Spinner />
  ) : (
    <Container fluid={true} className="py-5">
      <div className="my-2 py-5 px-5 recent-products shadow">
        <h4 className="text-light">Recent Products</h4>
        <span className="text-light mb-2">
          Check out the whole new products. One of the region’s most vibrant
          export hubs, Sri Lanka is equally competent in agriculture,
          manufacturing and service sector.
        </span>

        <Row>
          {products.splice(0, 8).map(product => (
            <Col md={3} xs={4} className="my-3">
              <ProductItem key={product._id} product={product} />
            </Col>
          ))}
        </Row>

        <p className="text-center mt-3">
          <Link to="/products" className="btn btn-outline-light btn-custom-2">
            Browse More
          </Link>
        </p>
      </div>
    </Container>
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
