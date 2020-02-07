import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div className="my-3">
      <Link to="/edit-profile" className="btn btn-light mx-1">
        <i className="fas fa-user-circle"></i> Edit Profile
      </Link>
      <Link to="/add-address" className="btn btn-light mx-1">
        <i class="fab fa-black-tie"></i> Add New Address
      </Link>
    </div>
  );
};

export default ProfileActions;
