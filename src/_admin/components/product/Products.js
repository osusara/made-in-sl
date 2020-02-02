import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProducts } from "../../actions/product";
import ProductItem from "./ProductItem";
import ProductForm from "./ProductForm";

const Products = ({ getProducts, product: { products, loading } }) => {
  useEffect(
    () => {
      getProducts();
    },
    { getProducts }
  );

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Products</h1>
      <p className="lead">Finest products in Sri Lanka</p>

      <ProductForm />
      <div className="products">
        {products.map(product => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </Fragment>
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
