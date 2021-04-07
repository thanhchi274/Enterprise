import React from "react";
import { Container, Row, Col,Card, CardBody, Form, FormInput } from "shards-react";
import SideBarActions from '../components/user/new-post/SidebarActions'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectEditPost } from "../Store/data/data.selector";
import { setEditPost } from "../Store/data/data.action";
import PageTitle from "../components/common/PageTitle";
const AddNewPost = ({ editPost, setEditPost }) => {
  React.useEffect(() => {
    return setEditPost();
  }, []);
  return (
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
                <FormInput
                  size="lg"
                  className="mb-3"
                  placeholder="Your Post Title"
                  defaultValue={editPost ? editPost.title : ""}
                />
                <SideBarActions/>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  editPost: selectEditPost,
});
const mapDispatchToProps = (dispatch) => ({
  setEditPost: (data) => dispatch(setEditPost(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddNewPost);
