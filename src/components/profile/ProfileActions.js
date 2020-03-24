import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div className="my-3">
      <Link to="/edit-profile" className="btn btn-light mx-1">
        <i className="fas fa-user-circle"></i> Edit Profile
      </Link>
      <Link to="/add-address" className="btn btn-light mx-1">
        <i class="fas fa-home"></i> Add New Address
      </Link>
      <p className="text-secondary mx-2">*Make sure to add atleast one address for your profile</p>
    </div>
  );
};

export default ProfileActions;
