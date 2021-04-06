import React, {useEffect} from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import DetailAndComment from "../components/staff/blog/DetailAndComment";
import PendingPosts from "../components/staff/blog/PendingPosts";
import TimeTable from "../components/staff/blog/TimeTable";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectMagazinePost } from "../Store/data/data.selector";
import { fetchMagazinePostStaffStart } from "../Store/data/data.action";
const StaffManage = ({data,fetchMagazinePostStaffStart}) => {
  const [isATimeSelected, setSelectedATime] = React.useState(false);
  useEffect(() => {
    fetchMagazinePostStaffStart()
  }, [fetchMagazinePostStaffStart])
  console.log(fetchMagazinePostStaffStart)
  return (
    <Container fluid className="main-content-container px-4">
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
          <Col lg="8" md="8" sm="12" className="mb-4">
            <PendingPosts/>
          </Col>
          <Col lg="4" md="4" sm="12" className="mb-4">
            <DetailAndComment />
          </Col>
        </Row>
      )}
    </Container>
  );
};
const mapStateToProps = createStructuredSelector ({
  data:selectMagazinePost
})

const mapDispatchToProps = dispatch =>({
  fetchMagazinePostStaffStart:(data)=>dispatch(fetchMagazinePostStaffStart(data))
})

export default connect(mapStateToProps,mapDispatchToProps) (StaffManage);
