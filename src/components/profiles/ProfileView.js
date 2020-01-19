import React, { Fragment, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileBody";
import { getProfileById } from "../../actions/profile";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Container className="my-5">
            <h1>User Profile </h1>
            <Card className="my-3">
              <Card.Body>
                {auth.isAuthenticated &&
                  auth.loading === false &&
                  auth.user._id === profile.user && (
                    <Link to="/edit-profile" className="btn btn-dark my-3">
                      Edit Profile
                    </Link>
                  )}
                <ProfileTop profile={profile} />
              </Card.Body>
            </Card>
            <Link to="/buyer/profiles" className="btn btn-light my-3">
              Go Back to Profiles List
            </Link>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
