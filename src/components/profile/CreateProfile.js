import React, { useState, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    phone: ""
  });

  const { firstname, lastname, gender, phone } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment className="my-2">
      <Container
        style={{ height: "84vh" }}
        className="login-background user-background"
        fluid={true}
      >
        <Row style={{ height: "100%" }} className="user-page">
          <Col
            lg={6}
            md={12}
            sm={12}
            className="login-foreground user-foreground"
          >
            <Col md={8} sm={10} className="user-card">
              <Card className="my-5">
                <Card.Body>
                  <Card.Title className="text-center mb-5">
                    <h1>Create Your Profile</h1>
                  </Card.Title>
                  <Card.Text>
                    <Form onSubmit={e => onSubmit(e)}>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          placeholder="First Name"
                          className="text-center user-input"
                          name="firstname"
                          value={firstname}
                          onChange={e => onChange(e)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          placeholder="Last Name"
                          className="text-center user-input"
                          name="lastname"
                          value={lastname}
                          onChange={e => onChange(e)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          as="select"
                          className="text-center user-input"
                          name="gender"
                          value={gender}
                          onChange={e => onChange(e)}
                        >
                          <option vlaue="0">Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          placeholder="Phone"
                          className="text-center user-input"
                          name="phone"
                          value={phone}
                          onChange={e => onChange(e)}
                        />
                      </Form.Group>
                      <Button type="submit" className="btn-custom-1 my-1">
                        Create
                      </Button>
                      <Link
                        className="btn btn-custom-2 my-1 mx-1"
                        to="/profile"
                      >
                        Go Back
                      </Link>
                    </Form>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Col>
          <Col lg={6} md={12} sm={12}>
            <h1 className="hero-title">
              Hi, there!
              <p className="hero-text">
                We would love to know more about you. Create your profile by
                filling the form and click on Create button.
              </p>
            </h1>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

// with router is for the "history"
export default connect(null, { createProfile })(withRouter(CreateProfile));
