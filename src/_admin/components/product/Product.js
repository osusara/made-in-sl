import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProduct } from "../../actions/product";

import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

const Product = ({ getProduct, product: { product, loading }, match }) => {
  useEffect(() => {
    getProduct(match.params.id);
  }, [getProduct]);

  return loading || product === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/products" className="btn">
        Back to Products
      </Link>
      {/* Reuse the ProductItem component */}
      <ProductItem product={product} showActions={false} />
    </Fragment>
  );
};

Product.propTypes = {
  getProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps, { getProduct })(Product);
