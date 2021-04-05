import React from "react";
import { Container, Row, Col } from "shards-react";
import DragDropZone from '../components/user/dropzoneDiaglog/dropzoneDialog.component'
import PageTitle from "../components/common/PageTitle";
// import Editor from "../components/user/new-post/Editor";
import SidebarActions from "../components/user/new-post/SidebarActions";
const AddNewPost = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Add New Here" subtitle="Blog Magazine Post" className="text-sm-left" />
    </Row>
    <Row>
    <DragDropZone/>
      <Col lg="3" md="12">
        <SidebarActions />
      </Col>
    </Row>
  </Container>
);

export default AddNewPost;
