import React, { Fragment, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProducts } from "../../actions/product";
import ProductItem from "./ProductItem";

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
    <div>
      <Container className="text-center my-5">
        <h1 className="text-color-1">Products</h1>
        <p className="lead">
          One of the region’s most vibrant export hubs, Sri Lanka is equally
          competent in agriculture, manufacturing and service sector. The rest
          of the world has the opportunity to benefit from the country’s
          collective competitive advantage through sourcing from Sri Lanka.
        </p>
      </Container>

      <Container fluid={true} className="products">
        {/* Tea Category */}
        <div className="my-5 py-5 px-5 products-category products-tea">
          <h4>Ceylone Tea</h4>
          <span className="">
            In over one hundred and fifty years, the name Ceylon had become
            synonymous with the world’s finest tea. In the world’s eye and
            tongue, Ceylon was tea and tea was Ceylon. What Rolls Royce is to
            cars, Rolex is to watches, Havana is to cigars and Scotland is to
            whisky; Ceylon is to tea. The legendary lion of the Sri Lankan flag
            was introduced to the Ceylon Tea logo, to guard this commitment –
            the symbol of quality.
          </span>
          <Row>
            {products.map(product =>
              product.category === "Tea" ? (
                <Col md={3} xs={4} className="my-3">
                  <ProductItem key={product._id} product={product} />
                </Col>
              ) : (
                <Fragment></Fragment>
              )
            )}
          </Row>
        </div>

        {/* Spices Category */}
        <div className="my-5 py-5 px-5 products-category products-spices">
          <h4>Finest Spices in Sri Lanka</h4>
          <span className="">
            Ceylon spices are respected and highly valued in the whole world. In
            addition to taste, Ceylon spices are important key in maintaining a
            healthy lifestyle. Researches point out that arthritis, diabetes,
            heart diseases, and asthma can be treated using these spices,
            especially cinnamon. Therefore, incorporating these spices into your
            diet would be very beneficial.
          </span>
          <Row>
            {products.map(product =>
              product.category === "Spices" ? (
                <Col md={3} xs={4} className="my-3">
                  <ProductItem key={product._id} product={product} />
                </Col>
              ) : (
                <Fragment></Fragment>
              )
            )}
          </Row>
        </div>

        {/* Handcrafte Category */}
        <div className="my-5 py-5 px-5 products-category products-handcraft">
          <h4>Ceylone Handcraft</h4>
          <span className="">
            Sri Lanka has a proud heritage of arts and crafts and you’ll find a
            distinctive memento to take home among the wide range of items for
            sale in Colombo. Popular handicrafts include gold and silver
            jewellery set with gems, wooden masks, intricate lace-work,
            lacquerwork and ceramics.
          </span>
          <Row>
            {products.map(product =>
              product.category === "Handcraft" ? (
                <Col md={3} xs={4} className="my-3">
                  <ProductItem key={product._id} product={product} />
                </Col>
              ) : (
                <Fragment></Fragment>
              )
            )}
          </Row>
        </div>

        {/* Ceramics Category */}
        <div className="my-5 py-5 px-5 products-category products-ceramic">
          <h4>Sri Lankan Ceramic and Porcelain</h4>
          <span className="">
            With the country’s rich artistic and cultural heritage, Sri Lankan
            ceramic industry dates back to the pre-Christian era. The
            distinctive designs and exquisite elegance of the ceramic products
            manufactured by the Sri Lankan ceramic industry today vividly
            illustrate the influence of this rich heritage.
          </span>
          <Row>
            {products.map(product =>
              product.category === "ceramic" ? (
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
