import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div className="my-3">
      <Link to="/edit-profile" className="btn btn-light mx-1">
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </Link>
    </div>
  );
};

export default ProfileActions;
