import React, { Fragment, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getBuyerProfiles } from "../../actions/profile";
import ProfileItem from "./BuyerProfileItem";

const Profiles = ({ profile: { buyerprofiles, loading } }) => {

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Container className="my-3 user-background">
            <Row>
              <Col md={12} className="">
                {buyerprofiles.length > 0 ? (
                  buyerprofiles.map(profile => (
                    <ProfileItem key={profile._id} profile={profile} />
                  ))
                ) : (
                  <h4>No Profiles found</h4>
                )}
              </Col>
            </Row>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {})(Profiles);
