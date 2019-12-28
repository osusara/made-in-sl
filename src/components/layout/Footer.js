import React, { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { logout } from "../../actions/auth";

const Footer = ({ auth: { isAuthenticated, isSeller, loading } }) => {
  const guestLinks = (
    <a href="/seller/login" className="text-center" onClick={logout}>
      Login as a Seller
    </a>
  );

  const authLinks = (
    <a href="/seller/register" className="text-center">
      Register a new Seller
    </a>
  );

  return (
    <Container fluid="true" className="footer shadow-sm py-4">
      <Row>
        <Col md={4} lg={4} sm={12} className="text-center px-1">
          {!loading && (
            <Fragment>{isAuthenticated && isSeller ? authLinks : guestLinks}</Fragment>
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
