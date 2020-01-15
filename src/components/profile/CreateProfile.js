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
    phone: "",
    no: "",
    street: "",
    city: "",
    postalcode: "",
    province: "",
    region: ""
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    firstname,
    lastname,
    gender,
    phone,
    no,
    street,
    city,
    postalcode,
    province,
    region
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
          <Col lg={6} md={12} sm={12}>
            <Col md={8} sm={10} className="user-card">
              <Card className="my-5">
                <Card.Body>
                  <Card.Title className="text-center my-2">
                    <h1>Create Your Profile</h1>
                    <p className="lead">
                      <i className="fas fa-user"></i> Let's get some information
                      to make your profile stand out
                    </p>
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

                      <div className="my-2">
                        <Button
                          onClick={() =>
                            toggleSocialInputs(!displaySocialInputs)
                          }
                          type="button"
                          className="btn-custom-2"
                        >
                          Add Your Address
                        </Button>
                      </div>

                      {displaySocialInputs && (
                        <Fragment>
                          <Form.Group>
                            <Form.Control
                              type="text"
                              placeholder="Address"
                              className="text-center user-input"
                              name="no"
                              value={no}
                              onChange={e => onChange(e)}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Control
                              type="text"
                              placeholder="Street"
                              className="text-center user-input"
                              name="street"
                              value={street}
                              onChange={e => onChange(e)}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Control
                              type="text"
                              placeholder="City"
                              className="text-center user-input"
                              name="city"
                              value={city}
                              onChange={e => onChange(e)}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Control
                              type="text"
                              placeholder="Postal Code"
                              className="text-center user-input"
                              name="postalcode"
                              value={postalcode}
                              onChange={e => onChange(e)}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Control
                              type="text"
                              placeholder="Province"
                              className="text-center user-input"
                              name="province"
                              value={province}
                              onChange={e => onChange(e)}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Control
                              type="text"
                              placeholder="Region"
                              className="text-center user-input"
                              name="region"
                              value={region}
                              onChange={e => onChange(e)}
                            />
                          </Form.Group>
                        </Fragment>
                      )}

                      <Button type="submit" className="btn-custom-1 my-1">
                        Create
                      </Button>
                      <Link className="btn btn-custom-2 my-1" to="/buyer/profile">
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
        </Row>
      </Container>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

// with router is for the "history"
export default connect(null, { createProfile })(withRouter(CreateProfile));
