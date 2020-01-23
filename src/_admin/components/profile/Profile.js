import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";

import Spinner from "../layout/Spinner";
import ProfileActions from "./ProfileActions";

const Profile = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Container className="my-5 user-background">
        <h1>Profile</h1>
        <span className="">
          <i className="fas fa-user"></i> Username: {user && user.username}
        </span>
        <br />
        <span>User ID: {user._id}</span>

        {/* check if the profile is available */}
        {profile !== null ? (
          <Fragment className="my-3">
            <ProfileActions />
            <Card>
              <Card.Body>
                <h2>
                  Hi, {profile.firstname}
                </h2>
                <span>Contact: {profile.phone}</span> |{" "}
                <span>Email: {user.email}</span>
                <br />
                <br />
                <div className="my-2">
                  <Button
                    className="btn btn-danger"
                    onClick={() => deleteAccount()}
                  >
                    <i className="fas fa-user-minus"></i> Delete Account
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/seller/create-profile" className="btn btn-dark my-1">
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
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
