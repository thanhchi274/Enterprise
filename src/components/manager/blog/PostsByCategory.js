import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
} from "shards-react";

import Chart from "../../../utils/chart";

class PostsByCategory extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }
  componentDidMount() {
   let {analysisData} = this.props
    const chartConfig ={
      type: "pie",
      data:{
        datasets: [
          {
            hoverBorderColor: "#ffffff",
            data: [analysisData[0].totalPost, analysisData[1].totalApproved, analysisData[2].totalRejected],
            backgroundColor: [
              "rgba(0,123,255,0.9)",
              "rgba(0,123,255,0.5)",
              "rgba(0,123,255,0.3)"
            ]
          }
        ],
        labels: ["Post", "Approved", "Reject"]
      },
      options: {
        ...{
          legend: {
            position: "bottom",
            labels: {
              padding: 25,
              boxWidth: 20
            }
          },
          cutoutPercentage: 0,
          tooltips: {
            custom: false,
            mode: "index",
            position: "nearest"
          }
        },
        ...this.props.chartOptions
      }
    };
    new Chart(this.canvasRef.current, chartConfig);
  }

  render() {
    const { title } = this.props;
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="d-flex py-0">
          <canvas
            height="220"
            ref={this.canvasRef}
            className="blog-users-by-device m-auto"
          />
        </CardBody>
      </Card>
    );
  }
}

PostsByCategory.propTypes = {
  title: PropTypes.string,
  chartConfig: PropTypes.object,
  chartOptions: PropTypes.object,
};

PostsByCategory.defaultProps = {
  title: "Posts of System",
};

export default PostsByCategory;
