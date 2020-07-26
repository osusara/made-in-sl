import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProducts } from "../../actions/product";
import ProductItem from "./ProductItem";

const Products = ({ getProducts, product: { products, loading } }) => {
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const teaProducts = () => {
    const teaElements = [];
    let i = 0;
    products.forEach(product => {
      if (product.category === "Tea" && i < 4) {
        teaElements.push(
          <Col md={3} xs={4} className="my-3">
            <ProductItem key={product._id} product={product} />
          </Col>
        );
        i++;
      }
    });

    return teaElements;
  };

  const spicesProducts = () => {
    const spicesElements = [];
    let i = 0;
    products.forEach(product => {
      if (product.category === "Spices" && i < 4) {
        spicesElements.push(
          <Col md={3} xs={4} className="my-3">
            <ProductItem key={product._id} product={product} />
          </Col>
        );
        i++;
      }
    });

    return spicesElements;
  };

  const handcraftProducts = () => {
    const handcraftElements = [];
    let i = 0;
    products.forEach(product => {
      if (product.category === "Handcraft" && i < 4) {
        handcraftElements.push(
          <Col md={3} xs={4} className="my-3">
            <ProductItem key={product._id} product={product} />
          </Col>
        );
        i++;
      }
    });

    return handcraftElements;
  };

  const ceramicProducts = () => {
    const ceramicElements = [];
    let i = 0;
    products.forEach(product => {
      if (product.category === "Ceramic" && i < 4) {
        ceramicElements.push(
          <Col md={3} xs={4} className="my-3">
            <ProductItem key={product._id} product={product} />
          </Col>
        );
        i++;
      }
    });

    return ceramicElements;
  };

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <Container fluid={true} className="products">
        {/* Tea Category */}
        <div className="my-5 py-5 px-5 products-category products-Tea shadow">
          <h4>Ceylon Tea</h4>
          <span className="">
            In over one hundred and fifty years, the name Ceylon had become
            synonymous with the world’s finest tea. In the world’s eye and
            tongue, Ceylon was tea and tea was Ceylon. What Rolls Royce is to
            cars, Rolex is to watches, Havana is to cigars and Scotland is to
            whisky; Ceylon is to tea. The legendary lion of the Sri Lankan flag
            was introduced to the Ceylon Tea logo, to guard this commitment –
            the symbol of quality.
          </span>
          <Row>{teaProducts()}</Row>
        </div>

        {/* Spices Category */}
        <div className="my-5 py-5 px-5 products-category products-Spices shadow">
          <h4>Finest Spices in Sri Lanka</h4>
          <span className="">
            Ceylon spices are respected and highly valued in the whole world. In
            addition to taste, Ceylon spices are important key in maintaining a
            healthy lifestyle. Researches point out that arthritis, diabetes,
            heart diseases, and asthma can be treated using these spices,
            especially cinnamon. Therefore, incorporating these spices into your
            diet would be very beneficial.
          </span>
          <Row>{spicesProducts()}</Row>
        </div>

        {/* Handcrafte Category */}
        <div className="my-5 py-5 px-5 products-category products-Handcraft shadow">
          <h4>Ceylon Handcraft</h4>
          <span className="">
            Sri Lanka has a proud heritage of arts and crafts and you’ll find a
            distinctive memento to take home among the wide range of items for
            sale in Colombo. Popular handicrafts include gold and silver
            jewellery set with gems, wooden masks, intricate lace-work,
            lacquerwork and ceramics.
          </span>
          <Row>{handcraftProducts()}</Row>
        </div>

        {/* Ceramics Category */}
        <div className="my-5 py-5 px-5 products-category products-Ceramic shadow">
          <h4>Sri Lankan Ceramic and Porcelain</h4>
          <span className="">
            With the country’s rich artistic and cultural heritage, Sri Lankan
            ceramic industry dates back to the pre-Christian era. The
            distinctive designs and exquisite elegance of the ceramic products
            manufactured by the Sri Lankan ceramic industry today vividly
            illustrate the influence of this rich heritage.
          </span>
          <Row>{ceramicProducts()}</Row>
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
