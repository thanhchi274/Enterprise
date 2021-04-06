import React from "react";
import { Container, Row, Col } from "shards-react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectEditPost } from "../Store/data/data.selector";
import { setEditPost } from "../Store/data/data.action";

import PageTitle from "../components/common/PageTitle";
import Editor from "../components/user/new-post/Editor";
import SidebarActions from "../components/user/new-post/SidebarActions";
import SidebarCategory from "../components/user/new-post/SidebarCategories";

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
        {/* Editor */}
        <Col lg="9" md="12">
          <Editor editPost={editPost} />
        </Col>

        {/* Sidebar Widgets */}
        <Col lg="3" md="12">
          <SidebarCategory />
          <SidebarActions editPost={editPost} />
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
