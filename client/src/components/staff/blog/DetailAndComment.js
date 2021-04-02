import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  FormInput,
  FormTextarea,
  Button,
} from "shards-react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectPendingPost } from "../../../Store/data/data.selector";
import { setComment } from "../../../Store/data/data.action";

const DetailAndComment = ({ title, pendingPost, setCommentRedux }) => {
  const [post, setPost] = React.useState(null);
  const [comment, setContentComment] = React.useState(null);

  React.useEffect(() => {
    if (pendingPost) {
      setPost(pendingPost);
    }
  }, [pendingPost]);

  const setComment = (e) => {
    e.preventDefault();
    setCommentRedux({
      ...pendingPost,
      comment
    });
  };

  const handleInputComment = (e) => {
    var content = e.target.value;

    if (content !== " " && content.length > 0) {
      setContentComment(content);
    }
  };

  return (
    <Card small className="h-100">
      {/* Card Header */}
      <CardHeader className="border-bottom">
        <h6 className="m-0">{title}</h6>
      </CardHeader>

      <CardBody className="d-flex flex-column">
        <Form className="quick-post-form">
          {/* Title */}
          <FormGroup>
            <FormInput
              placeholder={post ? post.post?.title : "Post Title"}
              disabled
            />
          </FormGroup>

          {/* Body */}
          <FormGroup>
            <FormTextarea
              placeholder="Write comment here..."
              onChange={handleInputComment}
            />
          </FormGroup>

          {/* Create Draft */}
          <FormGroup className="mb-0">
            <Button theme="accent" type="submit" onClick={setComment}>
              Comment
            </Button>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
};

DetailAndComment.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
};

DetailAndComment.defaultProps = {
  title: "Details Comment",
};

const mapStateToProps = createStructuredSelector({
  pendingPost: selectPendingPost,
});
const mapDispatchToProps = (dispatch) => ({
  setCommentRedux: (data) => dispatch(setComment(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DetailAndComment);
