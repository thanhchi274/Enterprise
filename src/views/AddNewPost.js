import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
} from "shards-react";
import SideBarActions from "../components/user/new-post/SidebarActions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectEditPost,
  selectClosureDates,
} from "../Store/data/data.selector";
import { setEditPost } from "../Store/data/data.action";
import { fetchClosureDateStart } from "../Store/data/data.action";
import PageTitle from "../components/common/PageTitle";
const AddNewPost = ({
  setEditPost,
  event,
  fetchClosureDateStart,
}) => {
  useEffect(() => {
    fetchClosureDateStart();
  }, [fetchClosureDateStart]);
  useEffect(() => {
    return setEditPost();
  }, []);
  return event ? (
    <Container fluid className="main-content-container px-4 pb-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Add New Post"
          subtitle="Blog Posts"
          className="text-sm-left"
        />
      </Row>
      <Row>
        <Col lg="12" md="12">
          <Card small className="mb-3">
            <CardBody>
              <Form className="add-new-post">
                {event.map((item, index) => {
                  let sortTime = item.closureDates.sort((a,b)=>a>b?-1:0)
                  return parseInt(item.year) === new Date().getFullYear()?
                  sortTime.map((item, index) => {
                    return (
                      <SideBarActions data={item} />
                    )})
               :null;
                })}
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <p>Is Loading</p>
  );
};

const mapStateToProps = createStructuredSelector({
  event: selectClosureDates,
  editPost: selectEditPost,
});
const mapDispatchToProps = (dispatch) => ({
  setEditPost: (data) => dispatch(setEditPost(data)),
  fetchClosureDateStart: (data) => dispatch(fetchClosureDateStart(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddNewPost);
