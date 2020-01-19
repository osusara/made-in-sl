import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

const ProfileBody = ({
  profile: {
    firstname,
    lastname,
    gender,
    phone,
    // user: { username, avatar }
  }
}) => {
  return (
    <Row>
      <Col md={10} xs={12}>
        {/* <img className="round-img my-1" src={avatar} alt="" /> */}
        {/* <h1 className="large">{username}</h1> */}
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
