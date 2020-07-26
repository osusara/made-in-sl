import React, { useState, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    location: "",
    phone: "",
    email: ""
  });

  const { company, location, phone, email } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Card className="my-3">
      <Card.Body>
        <Card.Title className="text-center my-2">
          <h1>Create Your Profile</h1>
          <br />
        </Card.Title>
        <Card.Text>
          <Form onSubmit={e => onSubmit(e)}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Company Name"
                className="text-center user-input"
                name="company"
                value={company}
                onChange={e => onChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Company Location"
                className="text-center user-input"
                name="location"
                value={location}
                onChange={e => onChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Company Phone"
                className="text-center user-input"
                name="phone"
                value={phone}
                onChange={e => onChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Company Email"
                className="text-center user-input"
                name="email"
                value={email}
                onChange={e => onChange(e)}
              />
            </Form.Group>
            <div className="text-center mx-auto">
              <Button type="submit" className="btn-primary my-1">
                Create
              </Button>
            </div>
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

// with router is for the "history"
export default connect(null, { createProfile })(withRouter(CreateProfile));
