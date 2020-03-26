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
        className="user-background"
        fluid={true}
      >
        <Row style={{ height: "100%" }} className="user-page">
          <Col lg={6} md={12} sm={12} className="mx-auto">
            <Col md={8} sm={10} className="user-card">
              <Card className="my-5">
                <Card.Body>
                  <Card.Title className="text-center my-2">
                    <h1>Admin Login</h1>
                    <br />
                  </Card.Title>
                  <Card.Text>
                    <Form onSubmit={e => onSubmit(e)} >
                      <Form.Group controlId="formBasicEmail" className="mx-4">
                        <Form.Control
                          className="text-center user-input"
                          type="email"
                          placeholder="Enter you email"
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
                          placeholder="Enter your password"
                          name="password"
                          value={password}
                          onChange={e => onChange(e)}
                          minLength="8"
                          required
                        />
                      </Form.Group>
                      <div className="text-center">
                        <Button type="submit" className="px-3">Login</Button>
                      </div>
                    </Form>
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