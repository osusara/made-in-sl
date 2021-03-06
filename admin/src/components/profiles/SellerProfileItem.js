import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileItem = ({
  profile: {
    company,
    user,
  },
}) => {
  return (
    <ListGroup className="my-1">
      <ListGroup.Item>
        <span>{company}</span>
        <Link to={`/profile/${user}`} className="float-right">View Profile</Link>
      </ListGroup.Item>
    </ListGroup>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
