import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";

import Spinner from "../layout/Spinner";
import ProfileActions from "./ProfileActions";

const Profile = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Container className="my-3">
        <h1 className="large text-primary">Profile</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome{" "}
          <strong>{user && user.username}</strong>
        </p>

        {/* check if the profile is available */}
        {profile !== null ? (
          <Fragment>
            <ProfileActions />
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/seller/create-profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </Fragment>
        )}
      </Container>
    </Fragment>
  );
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
