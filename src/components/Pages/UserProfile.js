import React, { useEffect, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";

import Spinner from "../layout/Spinner";
import EditProfile from "../profile/EditProfile";
import Profile from "../profile/Profile";

const UserProfile = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null && user === null ? (
    <Spinner />
  ) : (
    <Container fluid={true}>
      <h2 className="text-primary">Profile</h2>
      <hr />
      <Container fluid={true} className="user-background">
        <Row style={{ height: "100%" }} className="user-page">
          <Col lg={6} md={12} sm={12}>
            <Profile />
          </Col>
          <Col lg={6} md={12} sm={12} className="user-foreground verticalLine">
            {profile !== null ? <EditProfile /> : <Spinner />}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(UserProfile);
