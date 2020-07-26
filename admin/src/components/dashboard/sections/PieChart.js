import React from "react";
import { Container, Card } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../layout/Spinner";

const PieChart = () => {
  return (
    <Container fluid={true}>
      <Card>
        <Pie
          data={{
            labels: ["Spices", "Tea", "Handcraft"],
            datasets: [
              {
                label: "Count of Buyers According to the Country",
                data: [2, 1, 3],
                backgroundColor: [
                  "#F7464A",
                  "#46BFBD",
                  "#FDB45C",
                  "#949FB1",
                  "#4D5360",
                ],
                borderColor: [
                  "#F7464A",
                  "#46BFBD",
                  "#FDB45C",
                  "#949FB1",
                  "#4D5360",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            title: {
              display: true,
              text: "Top Selling Products",
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
      </Card>
    </Container>
  );
};

export default PieChart;
