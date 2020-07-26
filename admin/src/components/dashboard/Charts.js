import React, { useState, useEffect, Fragment } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";
import CountryChart from "./sections/CountryChart";
import PieChart from "./sections/PieChart";

const Charts = ({buyerprofiles, sellerprofiles}) => {

  useEffect(() => {
    getCountries(buyerprofiles);
  }, []);

  // country chart section ===================================================
  const getCountries = (buyerprofiles) => {
    const countriesList = [];
    const countList = [];

    const dataset = [
      {
        label: "Count of Buyers According to the Country",
        data: [],
        backgroundColor: [
          "#949FB1",
          "#4D5360",
        ],
        borderColor: ["#949FB1", "#4D5360"],
        borderWidth: 1,
      },
    ];

    buyerprofiles.map((buyer) => {
      if (countriesList.indexOf(buyer.country) < 0) {
        countriesList.push(buyer.country);
        countList.push(0);
      }
    });

    buyerprofiles.map((buyer) => {
      countList[countriesList.indexOf(buyer.country)] += 1;
    });
    dataset.data = countList;

    
    setCountryChartData({
      ...countryChartData,
      labels: countriesList,
      datasets: dataset
    });
    console.log(countryChartData);
  };

  const [countryChartData, setCountryChartData] = useState({
    labels: [],
    datasets: [],
  });

  // return section =========================================================
  return (
    <Container fluid={true}>
      {buyerprofiles == [] || buyerprofiles == null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Button onClick={(e) => getCountries(buyerprofiles)} className="my-4 mx-2">
            <i className="fas fa-refresh"></i>Refresh
          </Button>
          <Row>
            <Col md={6}>
              <CountryChart chartData={countryChartData} />
            </Col>
            <Col md={6}>
              <PieChart />
            </Col>
          </Row>
        </Fragment>
      )}
    </Container>
  );
};

Charts.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {})(Charts);
