import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

const ProfileBody = ({
  profile: {
    company,
    location,
    email,
    phone,
  }
}) => {
  return (
    <Row>
      <Col md={10} xs={12}>
        <h4 className="lead">{company} at {location}</h4>
        <span>Contact: {phone} | Email: {email}</span>
      </Col>
    </Row>
  );
};

ProfileBody.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileBody;
