import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Row,
  Col,
} from "shards-react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectComment,selectMagazinePost } from "../../../Store/data/data.selector";
import { setPendingPost,approvePost } from "../../../Store/data/data.action";
import PostModal from "../post/PostModal";
const PendingPosts = ({
  title,
  pendingPosts,
  setPendingPost,
  postWithComment,
  approvePost,
  data
}) => {
  const [posts, setPosts] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [postDetails, setPostDetails] = React.useState(null);
  const [viewAll, setViewAll] = React.useState(false);

  React.useEffect(() => {
    setPosts(data);
  }, []);

  React.useEffect(() => {
    if (postWithComment && posts) {
      const newPendingPosts = posts.filter(
        (item) => item.title !== postWithComment.title || item.body !== postWithComment.body
      );
      newPendingPosts.unshift(postWithComment);
      setPosts(newPendingPosts);
    }
  }, [postWithComment]);

  const handleOpenModal = (e, post) => {
    e.preventDefault();
    setPostDetails(post);
    setOpen(true);
  };
  const handleApprove  =(e,item)=>{
    e.preventDefault();
    approvePost(item)
  }
  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleClickPost = (e, post) => {
    e.preventDefault();
    setPendingPost(post);
  };

  const handleViewAll = (e) => {
    e.preventDefault();

    const bodyElement = document.getElementById("body_pending_posts");

    bodyElement.style.height = "auto";
    bodyElement.style.overflowY = "inherit";

    setViewAll(true);
  };

  const handleViewHide = (e) => {
    e.preventDefault();

    const bodyElement = document.getElementById("body_pending_posts");

    bodyElement.style.height = "500px";
    bodyElement.style.overflowY = "scroll";

    setViewAll(false);
  };

  return (
    <Card small className="blog-comments">
      <CardHeader className="border-bottom">
        <h6 className="m-0">{title}</h6>
      </CardHeader>

      <CardBody
        className="p-0"
        id="body_pending_posts"
        style={{ height: "500px", overflowY: "scroll" }}
      >
        {posts?.map((post, idx) => (
          <div
            key={idx}
            className="blog-comments__item d-flex p-3"
            onClick={(e) => handleClickPost(e, post)}
          >
            {/* Avatar */}
            <div className="blog-comments__avatar mr-3">
              <img src={'https://picsum.photos/200/300'} alt={post.author} />
            </div>

            {/* Content */}
            <div
              className="blog-comments__content"
              style={{ marginLeft: "10px", width: "100%" }}
            >
              {/* Content :: Title */}
              <div className="blog-comments__meta text-mutes">
                <a className="text-secondary" href="#">
                  {post.author}
                </a>{" "}
                on{" "}
                <a className="text-secondary" href="#">
                  {post.title}
                </a>
                <span className="text-mutes">- {post.date}</span>
              </div>
              <p className="m-0 my-1 mb-2 text-muted">
                <i>
                  {post.comment ? `Comment: ${post.comment}` : "No comment"}
                </i>
              </p>
              <div
                className="blog-comments__actions"
                style={{ float: "right" }}
              >
                <ButtonGroup size="sm">
                  <Button theme="white" onClick={(e)=>handleApprove(e,post)}>
                    <span className="text-success">
                      <i className="material-icons">check</i>
                    </span>{" "}
                    Approve
                  </Button>
                  <Button theme="white">
                    <span className="text-danger">
                      <i className="material-icons">clear</i>
                    </span>{" "}
                    Reject
                  </Button>
                  <Button
                    theme="white"
                    onClick={(e) => handleOpenModal(e, post)}
                  >
                    <span className="text-info">
                      <i className="material-icons">info</i>
                    </span>{" "}
                    View details
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        ))}
      </CardBody>

      <CardFooter className="border-top">
        <Row>
          <Col className="text-center view-report">
            {!viewAll ? (
              <Button theme="white" type="submit" onClick={handleViewAll}>
                View All Pending Posts
              </Button>
            ) : (
              <Button theme="white" type="submit" onClick={handleViewHide}>
                Hide Pending Posts
              </Button>
            )}
          </Col>
        </Row>
      </CardFooter>
      <PostModal
        open={open}
        handleCloseModal={handleCloseModal}
        post={postDetails}
      />
    </Card>
  );
};

PendingPosts.propTypes = {
  title: PropTypes.string,
  discussions: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  postWithComment: selectComment,
  data:selectMagazinePost
});
const mapDispatchToProps = (dispatch) => ({
  setPendingPost: (data) => dispatch(setPendingPost(data)),
  approvePost:(data)=> dispatch(approvePost(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(PendingPosts);
