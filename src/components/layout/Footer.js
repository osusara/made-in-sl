import React, { Fragment } from "react";
import { Link } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

const Footer = ({ auth: { isAuthenticated, loading } }) => {

  return (
    <Container fluid="true" className="footer shadow-sm py-4">
      <Row>
        <Col md={4} lg={4} sm={12} className="text-center px-1">
          <Link to="/seller" className="nav nav-link text-dark text-center">Administrator</Link>
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
      <hr />
      <Row className="text-center">
        <Col>
          <span className="text-center text-dark">
            &copy; Made in Sri Lanka | 2020
          </span>
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
