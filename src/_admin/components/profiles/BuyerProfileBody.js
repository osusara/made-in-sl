import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

const ProfileBody = ({
  profile: {
    firstname,
    lastname,
    gender,
    phone,
  }
}) => {
  return (
    <Row>
      <Col md={10} xs={12}>
        <h4 className="lead">{firstname} {lastname}</h4>
        
        <span>Gender: {gender}</span><br />
        <span>Contact: {phone}</span>
      </Col>
    </Row>
  );
};

ProfileBody.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileBody;
