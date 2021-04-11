import React,{useEffect, useState} from "react";
import { Container, Row, Col } from "shards-react";
import ReportList from "../components/guest/home/ReportList";
import Login from "../components/guest/home/Login";
import SignUp from "../components/guest/home/SignUp";
import {fetchReportGuestViewStart} from '../Store/data/data.action'
import { connect } from 'react-redux'
import { createStructuredSelector } from "reselect";
import {selectProcessGuestData} from '../Store/data/data.selector'
const Home = ({fetchReportGuestViewStart,reviewData}) => {
  const [loginOrSignUp, setLoginOrSignUp] = useState("login");
  const [data, setData]=useState(null)
  useEffect(() => {
    fetchReportGuestViewStart()
  }, [fetchReportGuestViewStart])
  useEffect(() => {
    setData(reviewData)
  },[reviewData])
  return reviewData?(
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4"></Row>
      <Row>
        <Col lg="8" md="8" sm="12" className="mb-4">
          {loginOrSignUp === "login" ? (
            <Login setLoginOrSignUp={setLoginOrSignUp} />
          ) : (
            <SignUp setLoginOrSignUp={setLoginOrSignUp} />
          )}
        </Col>
        <Col lg="4" md="4" sm="12" className="mb-4">
          <ReportList data={reviewData} />
        </Col>
      </Row>
    </Container>
  ):<p>Loading</p>;
};
const mapStateToProps = createStructuredSelector({
  reviewData:selectProcessGuestData
})

const mapDispatchToProps =dispatch => ({
  fetchReportGuestViewStart:() => dispatch(fetchReportGuestViewStart()),
})

export default connect(mapStateToProps, mapDispatchToProps) (Home);
