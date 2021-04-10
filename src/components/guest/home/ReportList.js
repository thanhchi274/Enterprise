import React from "react";
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

import ReportModal from "./ReportModal";

const reports = [
  {
    closureDate: new Date().toLocaleDateString("en-US"),
    postWithoutComments: 12,
    postWithoutCommentsAfter14days: 8,
    allPosts: 20,
  },
  {
    closureDate: new Date().toLocaleDateString("en-US"),
    postWithoutComments: 10,
    postWithoutCommentsAfter14days: 2,
    allPosts: 20,
  },
  {
    closureDate: new Date().toLocaleDateString("en-US"),
    postWithoutComments: 20,
    postWithoutCommentsAfter14days: 12,
    allPosts: 20,
  },
];

const ReportList = ({ title }) => {
  const [viewAll, setViewAll] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [report, setReport] = React.useState();

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

  const handleOpenModal = (e, report) => {
    e.preventDefault();
    setReport(report);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <Card small className="blog-comments">
      <CardHeader className="border-bottom">
        <h6 className="m-0">{title}</h6>
      </CardHeader>

      {/* <CardBody
        className="p-0"
        id="body_reports"
        style={{ height: "270px", overflowY: "scroll" }}
      >
        {reports?.map((report, idx) => (
          <div
            key={idx}
            className="blog-comments__item d-flex p-3 hover_item_table"
            onClick={(e) => handleOpenModal(e, report)}
          >
            <div className="blog-comments__avatar mr-3">
              <i className="material-icons" style={{ fontSize: "50px" }}>
                description
              </i>
            </div>
            <div
              className="blog-comments__content"
              style={{ marginLeft: "10px", width: "100%" }}
            >
              <div className="blog-comments__meta text-mutes">
                <a className="text-secondary" href="#">
                  Report of {report.closureDate}
                </a>
              </div>
              <div
                className="blog-comments__actions"
                style={{ float: "right" }}
              >
                <ButtonGroup size="sm">
                  <Button theme="white" onClick={handleOpenModal}>
                    <span className="text-info">
                      <i className="material-icons">info</i>
                    </span>{" "}
                    View details
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        ))}
      </CardBody> */}

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

      <ReportModal
        open={open}
        handleCloseModal={handleCloseModal}
        report={report}
      />
    </Card>
  );
};

ReportList.propTypes = {
  title: PropTypes.string,
};

ReportList.defaultProps = {
  title: "Current Reports",
};

export default ReportList;
