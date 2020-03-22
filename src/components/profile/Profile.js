import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Card, Image, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";

import Spinner from "../layout/Spinner";
import ProfileActions from "./ProfileActions";
import Address from "./Address";

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
    <Container fluid={true} className="register-background py-4">
      <Container style={{backgroundColor: "#ffffff", borderRadius: "1rem"}} className="py-4 px-4">
        <h1 className="text-color-1">Profile</h1>
        <p className="">
          <i className="fas fa-user"></i> Username: {user && user.username} |
          User ID: {user._id}
        </p>

        {/* check if the profile is available */}
        {profile !== null ? (
          <Fragment className="my-3">
            <ProfileActions />
            <Card className="profile-container shadow-sm">
              <Card.Body>
                <Row>
                  <Col md={4} xs={12}>
                    <Image
                      style={{ width: "100%" }}
                      src={user.avatar}
                      alt="Profile image"
                      rounded
                    />
                  </Col>
                  <Col md={8} xs={12}>
                    <h2 className="my-2">
                      Hi, {profile.firstname} {profile.lastname}
                    </h2>
                    <span>Contact: {profile.phone}</span> |{" "}
                    <span>Email: {user.email}</span>
                    <br />
                    <span>Gender: {profile.gender}</span>
                    <br />
                    <Address address={profile.address} />
                    <div className="my-2">
                      <Button
                        className="btn btn-danger"
                        onClick={() => deleteAccount()}
                      >
                        <i className="fas fa-user-minus"></i> Delete Account
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-dark my-1">
              Create Profile
            </Link>
          </Fragment>
        )}
      </Container>
    </Container>
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

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Profile
);
