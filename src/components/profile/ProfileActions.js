import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/buyer/edit-profile" className="btn btn-custom-2">
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </Link>
      <Link to="/buyer/add-address" className="btn btn-custom-2">
        <i class="fab fa-black-tie text-primary"></i> Add Experience
      </Link>
    </div>
  );
};

export default ProfileActions;
