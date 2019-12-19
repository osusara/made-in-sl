import React, { Fragment, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
      email: '',
      password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    console.log('SUCCESS');
  };

  return (
    <Fragment>
      <Container className="login-background" fluid={true}>
        <Row style={{ height: "100%" }} className="login-page">
          <Col md={6} sm={12}>
            <h1 className="login-text">Lankan to the Last Drop</h1>
          </Col>
          <Col md={6} sm={12} className="login-foreground">
            <Col md={8} sm={10} className="login-card">
              <Card className="my-5">
                <Card.Body>
                  <Card.Title className="text-center my-2">
                    <h1>Sign In</h1>
                  </Card.Title>
                  <Card.Text>
                    <Form
                      onSubmit={e => onSubmit(e)}
                      className="text-center user-form"
                    >
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
                          minLength="6"
                          required
                        />
                      </Form.Group>
                      <Button
                        type="submit"
                        className="px-5 user-btn btn-custom"
                      >
                        Login
                      </Button>
                    </Form>
                    <p className="text-center my-1">
                      Don't have an account? <Link style={{color: "#b63a46"}} to="/register">Sign Up</Link>
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

export default Login;