import React, {useState, useEffect } from "react";
import { Container, Row, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import PendingPosts from "../components/staff/blog/PendingPosts";
import TimeTable from "../components/staff/blog/TimeTable";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectMagazinePost,
  selectEachEvent,
} from "../Store/data/data.selector";
import {selectCurrentUser} from '../Store/user/user.selector'
import { fetchMagazinePostStaffStart,fetchClosureDateStart } from "../Store/data/data.action";
const StaffManage = ({ fetchMagazinePostStaffStart,fetchClosureDateStart, event,currentUser }) => {
  const [isATimeSelected, setSelectedATime] = useState(false);
  const [faulty, setFaulty] = useState('')
  const userProvider =  currentUser? currentUser.providerData[1]:null
  useEffect(() => {
    fetchMagazinePostStaffStart();
  }, [fetchMagazinePostStaffStart]);
  useEffect(() => {
    fetchClosureDateStart()
  }, [fetchClosureDateStart])
  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Management"
          subtitle="Marketing Coordinator"
          className="text-sm-left"
        />
      </Row>
      <TimeTable
        isATimeSelected={isATimeSelected}
        setSelectedATime={setSelectedATime}
        setFaulty={setFaulty}
      />
      {isATimeSelected && (
        <Row>
          <Col lg="12" md="12" sm="12" className="mb-4">
         {event?<PendingPosts staffFaulty={userProvider.faulty} faulty={faulty} data={event} />:<p>Loading</p>}
          </Col>
        </Row>
      )}
    </Container>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser,
  event: selectEachEvent,
  data: selectMagazinePost,
});
const mapDispatchToProps = (dispatch) => ({
  fetchMagazinePostStaffStart: (data) =>
    dispatch(fetchMagazinePostStaffStart(data)),
    fetchClosureDateStart:(data)=>dispatch(fetchClosureDateStart(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(StaffManage);
