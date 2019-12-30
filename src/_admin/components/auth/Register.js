import React, { Fragment, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

import Alert from "../layout/Alert";

const Register = ({ setAlert, register, isAuthenticated }) => { // {setAlert} = props
  const [formData, setForMData] = useState({
    username: "",
    email: "",
    password: "",
    password2: ""
  });

  const { username, email, password, password2 } = formData;

  const onChange = e =>
    setForMData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("passwords are not matching", "danger");
    } else {
     register({ username, email, password });
    }
  };

  // redirect after registering
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <Container className="register-background user-background" fluid={true}>
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
          <Col lg={6} md={12} sm={12} className="register-foreground user-foreground">
            <Col md={8} sm={10} className="user-card">
              <Card className="my-5">
                <Card.Body>
                  <Card.Title className="text-center my-2">
                    <h1>Create an Account</h1>
                  </Card.Title>
                  <Card.Text>
                    
                    <Form onSubmit={e => onSubmit(e)} className="text-center user-form">
                      <Alert />
                      <Form.Group controlId="formBasicEmail" className="mx-4">
                        <Form.Control
                          className="text-center user-input"
                          type="text"
                          placeholder="Username"
                          name="username"
                          value={username}
                          onChange={e => onChange(e)}
                          required
                        />
                      </Form.Group>
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
                      <hr style={{ width: "50%" }} />
                      <Form.Group
                        controlId="formBasicPassword"
                        className="mx-4"
                      >
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
                      <Form.Group
                        controlId="formBasicPassword"
                        className="mx-4"
                      >
                        <Form.Control
                          className="text-center user-input"
                          type="password"
                          placeholder="Confirmation"
                          name="password2"
                          value={password2}
                          onChange={e => onChange(e)}
                          minLength="8"
                          required
                        />
                      </Form.Group>
                      <Button
                        type="submit"
                        className="px-5 btn-custom-1"
                      >
                        Sign Up
                      </Button>
                    </Form>
                    <p className="text-center my-1">
                      Already have an account?{" "}
                      <Link style={{ color: "#b63a46" }} to="/buyer/login">
                        Sign In
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register);