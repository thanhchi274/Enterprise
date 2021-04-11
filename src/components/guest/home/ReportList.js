import React,{useEffect} from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Row,
  Col,
} from "shards-react";
import Report from './Report'
const ReportList = ({ title, data }) => {
  const [viewAll, setViewAll] = React.useState(false);
  const handleViewAll = (e) => {
    e.preventDefault();
    const bodyElement = document.getElementById("body_reports");
    bodyElement.style.height = "auto";
    bodyElement.style.overflowY = "inherit";
    setViewAll(true);
  };
  const handleViewHide = (e) => {
    e.preventDefault();
    const bodyElement = document.getElementById("body_reports");
    bodyElement.style.height = "270px";
    bodyElement.style.overflowY = "scroll";
    setViewAll(false);
  };
  useEffect(() => {
    console.log(data)
  })
  return data?(
    <Card small className="blog-comments">
      <CardHeader className="border-bottom">
        <h6 className="m-0">{title}</h6>
      </CardHeader>
      <CardBody
        className="p-0"
        id="body_reports"
        style={{ height: "270px", overflowY: "scroll" }}
      >
      <Report name="Total Post" data={data.totalPost}/>
      <Report name="Approved Post" data={data.totalApproved}/>
      <Report name="Rejected Post" data={data.totalRejected}/>
      <Report name="Total User" data={data.totalUser}/>
      </CardBody>
      <CardFooter className="border-top">
        <Row>
          <Col className="text-center view-report">
            {!viewAll ? (
              <Button theme="white" type="submit" onClick={handleViewAll}>
                View All Reports
              </Button>
            ) : (
              <Button theme="white" type="submit" onClick={handleViewHide}>
                Hide Reports
              </Button>
            )}
          </Col>
        </Row>
      </CardFooter>
    </Card>
  ):<p>Is Loading</p>;
};

ReportList.propTypes = {
  title: PropTypes.string,
};

ReportList.defaultProps = {
  title: "Current Reports",
};

export default ReportList;
