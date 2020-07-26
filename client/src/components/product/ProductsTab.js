import React from "react";
import {
  Container,
  Tab,
  Tabs
} from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProductByCategory from "./ProductsByCategory";
import Products from "./Products";

const ProductsTabs = ( {product: { loading }} ) => {
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <Container className="text-center my-5">
        <h1 className="landing-title">Products</h1>
        <p className="landing-text">
          One of the region’s most vibrant export hubs, Sri Lanka is equally
          competent in agriculture, manufacturing and service sector. The rest
          of the world has the opportunity to benefit from the country’s
          collective competitive advantage through sourcing from Sri Lanka.
        </p>
        <hr style={{width: "50%"}} />
      </Container>

      <Container fluid={true}>
        <Tabs defaultActiveKey="all" className="navTab">
          <Tab eventKey="all" title="All">
            <Products />
          </Tab>
          <Tab eventKey="tea" title="Tea">
            <ProductByCategory category="Tea" />
          </Tab>
          <Tab eventKey="handcraft" title="Handcraft">
            <ProductByCategory category="Handcraft" />
          </Tab>
          <Tab eventKey="spices" title="Spices">
            <ProductByCategory category="Spices" />
          </Tab>
          <Tab eventKey="ceramic" title="Ceramic">
            <ProductByCategory category="Ceramic" />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

Products.propTypes = {
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps, {})(ProductsTabs);
