import React from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardBody } from "shards-react";
import Chart from "../../../utils/chart";

class UsersOverview extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const chartOptions = {
      ...{
        responsive: true,
        legend: {
          position: "top",
        },
        elements: {
          line: {
            // A higher value makes the line look skewed at this ratio.
            tension: 0.3,
          },
          point: {
            radius: 0,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: false,
              ticks: {
                callback(tick, index) {
                  // Jump every 7 values on the X axis labels to avoid clutter.
                  return index === 0 ? "" : tick;
                },
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                suggestedMax: 45,
                callback(tick) {
                  if (tick === 0) {
                    return tick;
                  }
                  // Format the amounts using Ks for thousands.
                  return tick > 100 ? `${tick / 50}` : tick;
                },
              },
            },
          ],
        },
        hover: {
          mode: "nearest",
          intersect: false,
        },
        tooltips: {
          custom: false,
          mode: "nearest",
          intersect: false,
        },
      },
      ...this.props.chartOptions,
    };

    const BlogUsersOverview = new Chart(this.canvasRef.current, {
      type: "LineWithLine",
      data: this.props.chartData,
      options: chartOptions,
    });

    // They can still be triggered on hover.
    const buoMeta = BlogUsersOverview.getDatasetMeta(0);
    buoMeta.data[0]._model.radius = 0;
    buoMeta.data[
      this.props.chartData.datasets[0].data.length - 1
    ]._model.radius = 0;

    // Render the chart.
    BlogUsersOverview.render();
  }

  render() {
    const { title } = this.props;
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="pt-0">
          <canvas
            height="120"
            ref={this.canvasRef}
            style={{ maxWidth: "100% !important" }}
          />
        </CardBody>
      </Card>
    );
  }
}

UsersOverview.propTypes = {
  title: PropTypes.string,
  chartData: PropTypes.object,
  chartOptions: PropTypes.object,
};

UsersOverview.defaultProps = {
  title: "Users Overview",
  chartData: {
    labels: Array.from(new Array(30), (_, i) => (i === 0 ? 1 : i)),
    datasets: [
      {
        label: "Current Month",
        fill: "start",
        data: [
          12,
          30,
          23,
          54,
          15,
          24,
          32,
          65,
          76,
          44,
          20,
          10,
          60,
          43,
          32,
          12,
          65,
          34,
          12,
          65,
          13,
          15,
          15,
          44,
          30,
          22,
          17,
          54,
          44,
          20,
        ],
        backgroundColor: "rgba(0,123,255,0.1)",
        borderColor: "rgba(0,123,255,1)",
        pointBackgroundColor: "#ffffff",
        pointHoverBackgroundColor: "rgb(0,123,255)",
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 3,
      },
      {
        label: "Past Month",
        fill: "start",
        data: [
          20,
          33,
          22,
          11,
          45,
          23,
          21,
          44,
          66,
          43,
          12,
          55,
          23,
          12,
          54,
          66,
          23,
          12,
          55,
          23,
          12,
          13,
          15,
          44,
          30,
          22,
          17,
          54,
          44,
          20,
        ],
        backgroundColor: "rgba(255,65,105,0.1)",
        borderColor: "rgba(255,65,105,1)",
        pointBackgroundColor: "#ffffff",
        pointHoverBackgroundColor: "rgba(255,65,105,1)",
        borderDash: [3, 3],
        borderWidth: 1,
        pointRadius: 0,
        pointHoverRadius: 2,
        pointBorderColor: "rgba(255,65,105,1)",
      },
    ],
  },
};

export default UsersOverview;
