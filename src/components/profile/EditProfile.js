import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, Button, Col, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    company: "",
    location: "",
    phone: "",
    email: ""
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      company: loading || !profile.company ? "" : profile.company,
      location: loading || !profile.location ? "" : profile.location,
      phone: loading || !profile.phone ? "" : profile.phone,
      email: loading || !profile.email ? "" : profile.email
    });
  }, [loading, getCurrentProfile]);

  const { company, location, phone, email } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Col md={10} sm={12} className="user-card">
      <Card className="my-5">
        <Card.Body>
          <Card.Title className="text-center my-2">
            <h1>Update Your Profile</h1>
            <br />
          </Card.Title>
          <Card.Text>
            <Form onSubmit={e => onSubmit(e)}>
              <Form.Label>Company Name</Form.Label>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Company"
                  name="company"
                  value={company}
                  onChange={e => onChange(e)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Company Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={e => onChange(e)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Company Phone</Form.Label>
                <Form.Control
                  type="phone"
                  placeholder="Phone"
                  name="phone"
                  value={phone}
                  onChange={e => onChange(e)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Company Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={e => onChange(e)}
                />
              </Form.Group>

              <Button type="submit" className="btn-primary my-1">
                Update
              </Button>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

// with router is for the "history"
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
