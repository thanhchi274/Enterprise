import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
} from "shards-react";
import Chart from "../../../utils/chart";
class FirstChartReport extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }
  componentDidMount() {
    const rateOfPostNoCommentAndTotal = this.props.report.postWithoutComments/this.props.report.allPosts
    const chartConfig = {
      type: "pie",
      data: {
        datasets: [
          {
            hoverBorderColor: "#ffffff",
            data: [rateOfPostNoCommentAndTotal, 1-rateOfPostNoCommentAndTotal],
            backgroundColor: [
              "rgba(0,123,255,0.9)",
              "rgba(0,123,255,0.5)",
            ]
          }
        ],
        labels: ["Posts without a comment", "Post with comments"]
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

FirstChartReport.propTypes = {
  title: PropTypes.string,
  chartConfig: PropTypes.object,
  chartOptions: PropTypes.object,
  chartData: PropTypes.object
};

FirstChartReport.defaultProps = {
  title: "Post without a comment",
  
};

export default FirstChartReport;
