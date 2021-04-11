import React,{useEffect } from "react";
import { Container, Row, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import Chart from '../components/manager/blog/Charts'
import PostsByCategory from "../components/manager/blog/PostsByCategory";
import DownloadAllPost from "../components/manager/post/DownloadAllPost";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {selectCurrentUser} from '../Store/user/user.selector'
import {fetchAnalysisDataStart,fetchDownloadAllDataStart} from '../Store/data/data.action'
import {selectAnalysisData,selectDownloadLinkData} from '../Store/data/data.selector'
const BlogOverview = ({ data,fetchAnalysisDataStart,analysisData,downloadLink }) => {
  useEffect(() => {
    fetchAnalysisDataStart()
  }, [fetchAnalysisDataStart])
  useEffect(() => {
    fetchDownloadAllDataStart()
  }, [fetchDownloadAllDataStart])
return analysisData.length > 0&&downloadLink.length>0?(
  <Container fluid className="main-content-container px-4 ">
    <Row noGutters className="page-header py-4 d-flex justify-content-between">
    <PageTitle
          sm="4"
          title="Statistic"
          subtitle="Marketing Manager"
          className="text-sm-left "
          style={{width: "20%"}}
        />
    </Row>
    <Row>
    <Chart analysisData={analysisData}/>
    </Row>
    <Row>
      {/* <Col lg="6" md="6" sm="12" className="mb-4"> */}
      {/* {analysisData.length>0?<PostsByCategory data={analysisData} />:null} */}
      {/* </Col> */}
      <Col lg="6" md="6" sm="12" className="mb-4">
      {downloadLink.length>0?<DownloadAllPost allPosts={downloadLink}/>:<p>Loading</p>}
      </Col>
    </Row>
  </Container>
      ):<p>IS LOADING</p>
    }

const mapStateToProps =createStructuredSelector({
  downloadLink:selectDownloadLinkData,
  analysisData:selectAnalysisData,
  currentUser:selectCurrentUser
})

const mapDispatchToProps = (dispatch)=>({
  fetchAnalysisDataStart:() => dispatch(fetchAnalysisDataStart()),
  fetchDownloadAllDataStart:() => dispatch(fetchDownloadAllDataStart()),
})

export default connect(mapStateToProps, mapDispatchToProps) (BlogOverview);
