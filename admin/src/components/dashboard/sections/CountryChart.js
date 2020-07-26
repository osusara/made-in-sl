import React from "react";
import { Container, Card } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../layout/Spinner";

const CountryChart = ({ chartData }) => {
  return (
    <Container fluid={true}>
      <Card>
        {chartData === [] || chartData === null ? (
          <Spinner />
        ) : (
          <Bar
            data={chartData}
            options={{
              title: {
                display: true,
                text: "Top Buyers' Countries",
                fontSize: 18,
              },
              legend: {
                display: false,
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            }}
          />
        )}
      </Card>
    </Container>
  );
};

CountryChart.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {})(CountryChart);
