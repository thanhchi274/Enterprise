import React,{useEffect} from "react";
import { Container, Row, Col } from "shards-react";
import {fetchClosureDateStart} from '../Store/data/data.action'
import { createStructuredSelector } from "reselect";
import { selectClosureDates } from "../Store/data/data.selector";
import PageTitle from "../components/common/PageTitle";
import DateTable from "../components/admin/closureDate/DateTable";
import { connect } from "react-redux";
const SetClosureDates = ({closureData,fetchClosureDateStart}) => {
  useEffect(() => {
    fetchClosureDateStart()
  }, [fetchClosureDateStart])
  return closureData?(
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Set Faculties"
          subtitle="Administrator"
          className="text-sm-left"
        />
      </Row>
      <Row>
        <Col lg="12" md="12" sm="12" className="mb-4">
          <DateTable closureData={closureData}/>
        </Col>
      </Row>
    </Container>
  ):<p>Loading</p>;
};
const mapStateToProps = createStructuredSelector({
  closureData:selectClosureDates
})

const mapDispatchToProps = (dispatch)=>({
  fetchClosureDateStart: () => dispatch(fetchClosureDateStart()),
})

export default connect(mapStateToProps, mapDispatchToProps) (SetClosureDates);
