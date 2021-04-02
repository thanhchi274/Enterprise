import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import DetailAndComment from "../components/staff/blog/DetailAndComment";
import PendingPosts from "../components/staff/blog/PendingPosts";
import TopReferrals from "./../components/common/TopReferrals";
import TimeTable from "../components/staff/blog/TimeTable";

const StaffManage = () => {
  const [isATimeSelected, setSelectedATime] = React.useState(false);
  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Post Management"
          subtitle="Management"
          className="text-sm-left"
        />
      </Row>

      <TimeTable setSelectedATime={setSelectedATime}/>

      {isATimeSelected && (
        <Row>
          {/* Discussions */}
          <Col lg="8" md="8" sm="12" className="mb-4">
            <PendingPosts />
          </Col>

          {/* Detail And Comment */}
          <Col lg="4" md="4" sm="12" className="mb-4">
            <DetailAndComment />
          </Col>
        </Row>
      )}
    </Container>
  );
};

StaffManage.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array,
};

StaffManage.defaultProps = {
  smallStats: [
    {
      label: "Users",
      value: "2,390",

      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [1, 2, 1, 3, 5, 4, 7],
        },
      ],
    },
    {
      label: "Posts",
      value: "182",

      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(23,198,113,0.1)",
          borderColor: "rgb(23,198,113)",
          data: [1, 2, 3, 3, 3, 4, 4],
        },
      ],
    },
    {
      label: "Comments",
      value: "8,147",

      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,180,0,0.1)",
          borderColor: "rgb(255,180,0)",
          data: [2, 3, 3, 3, 4, 3, 3],
        },
      ],
    },
    {
      label: "Rejected posts",
      value: "29",

      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,65,105,0.1)",
          borderColor: "rgb(255,65,105)",
          data: [1, 7, 1, 3, 1, 4, 8],
        },
      ],
    },
  ],
};

export default StaffManage;
