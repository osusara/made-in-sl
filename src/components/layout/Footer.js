import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

const Footer = ({ auth: { isAuthenticated, isSeller, loading } }) => {
  const guestLinks = (
    <a href="/seller/login" className="text-center">
      Login as a Seller
    </a>
  );

  const authLinks = (
    <Link to="/seller/register" className="text-center link">
      Register a new Seller
    </Link>
  );

  return (
    <Container fluid="true" className="footer shadow-sm py-4">
      <Row>
        <Col md={4} lg={4} sm={12} className="text-center px-1">
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </Col>
        <Col md={4} lg={4} sm={12} className="text-center px-1">
          <p>
            wwwwwwwwwwwwwwww wwwwwwwwwwwwwwwwww
            <br />
            wwwwwwwwwwwwwwwwwwwwww
          </p>
        </Col>
        <Col md={4} lg={4} sm={12} className="text-center px-1">
          <p>
            wwwwwwwwwwwwwwww wwwwwwwwwwwwwwwwww
            <br />
            wwwwwwwwwwwwwwwwwwwwww
          </p>
        </Col>
      </Row>
    </Container>
  );
};

Footer.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(Footer);
