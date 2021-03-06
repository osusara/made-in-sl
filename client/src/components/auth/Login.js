import React, { Fragment, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
      email: '',
      password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  // redirect if logged in
  if(isAuthenticated) {
    return <Redirect to='/' />
  }

  return (
    <Fragment>
      <Container
        style={{ height: "84vh" }}
        className="login-background user-background"
        fluid={true}
      >
        <Row style={{ height: "100%" }} className="user-page">
          <Col lg={6} md={12} sm={12}>
            <h1 className="hero-title">
              Welcome to
              <br />
              Made in Sri Lanka
              <p className="hero-text">
                Buy the finest products made in Sri Lanka for low price and in
                best quality. Only on Made in Sri Lanka, the world's online
                marketplace.
              </p>
            </h1>
          </Col>
          <Col
            lg={6}
            md={12}
            sm={12}
            className="login-foreground user-foreground"
          >
            <Col md={8} sm={10} className="user-card">
              <Card className="my-5">
                <Card.Body>
                  <Card.Title className="text-center my-2">
                    <h1>Sign In</h1>
                  </Card.Title>
                  <Card.Text>
                    <Form onSubmit={e => onSubmit(e)} className="text-center user-form">
                      <Form.Group controlId="formBasicEmail" className="mx-4">
                        <Form.Control
                          className="text-center user-input"
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={email}
                          onChange={e => onChange(e)}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="formBasicPassword" className="mx-4">
                        <Form.Control
                          className="text-center user-input"
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={password}
                          onChange={e => onChange(e)}
                          minLength="8"
                          required
                        />
                      </Form.Group>
                      <Button type="submit" className="px-5 btn-custom-1">
                        Login
                      </Button>
                    </Form>
                    <p className="text-center my-1">
                      Don't have an account?{" "}
                      <Link style={{ color: "#b63a46" }} to="/register">
                        Sign Up
                      </Link>
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);