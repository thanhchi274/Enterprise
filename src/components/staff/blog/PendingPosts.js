import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Row,
  Col,
} from "shards-react";
import DetailAndComment from "./DetailAndComment";
import { connect } from "react-redux";
import { setPendingPost, approvePost,rejectPost } from "../../../Store/data/data.action";
import { fetchEachEventStart } from "../../../Store/data/data.action";
const PendingPosts = ({
  setPendingPost,
  approvePost,
  rejectPost,
  data,
  fetchEachEventStart,
  faulty,
  staffFaulty
}) => {
  const [posts, setPosts] = useState(null);
  const [open, setOpen] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [commentData, setCommentData] = useState(null);
  useEffect(() => {
    setPosts(data);
  }, [data]);
  const handleApprove = async (e, item) => {
    e.preventDefault();
    if(staffFaulty===faulty){
      let approvedPost = { ...item, status: "Approved" };
      await Promise.all([
        (async () => approvePost(approvedPost))(),
        (async () => fetchEachEventStart(faulty))(),
      ]);
    }
    else{
      alert("Sorry you don't have permission to approve this post")
    }
  };
  const handleReject = async (e, item) => {
    e.preventDefault();
    if(staffFaulty===faulty){
      let rejectedPost = { ...item, status: "Rejected" };
      await Promise.all([
        (async () => rejectPost(rejectedPost))(),
        (async () => fetchEachEventStart(faulty))(),
      ]);
    }
    else{
      alert("Sorry you don't have permission to reject this post")
    }
  };
  const handleOpenFile = (item) => {
    window.open(item);
  };
  const handleClickPost = (e, post) => {
    e.preventDefault();
    setCommentData(post);
    setOpen(!open);
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
            <div className="blog-comments__avatar mr-3">
              <img src={"https://picsum.photos/200/300"} alt={"abc"} />
            </div>
            <div
              className="blog-comments__content"
              style={{ marginLeft: "10px", width: "100%" }}
            >
              <div className="blog-comments__meta d-flex justify-content-between px-2">
                <p className="text-secondary" href="#">
                  {post.email}
                </p>
                <p className="text-mutes">
                  {new Date(post.createAt).toLocaleString()}
                </p>
              </div>
              <p className="m-0 mb-2 text-muted">
                <i>
                  {post.comment ? `Comment: ${post.comment.message}` : "No comment"}
                </i>
              </p>
              <div
                className="blog-comments__actions"
                style={{ float: "right" }}
              >
                <ButtonGroup size="sm">
                  <Button
                    theme="white"
                    disabled={post.status==="Approved"?true:false}
                    onClick={(e) => handleApprove(e, post)}
                  >
                    <span className="text-success">
                      <i className="material-icons">check</i>
                    </span>{" "}
                    {post.status==="Approved" ? "Approved" : "Approve"}
                  </Button>
                  <Button theme="white" disabled={post.status==="Rejected"?true:false}
                       onClick={(e) => handleReject(e, post)}
                  >
                    <span className="text-danger">
                      <i className="material-icons">clear</i>
                    </span>{" "}
                    {post.status==="Rejected" ? "Rejected" : "Reject"}
                  </Button>
                  <Button
                    theme="white"
                    onClick={() => handleOpenFile(post.link)}
                  >
                    <span className="text-info">
                      <i className="material-icons">info</i>
                    </span>{" "}
                    First Post
                  </Button>
                  {post.link2 ? (
                    <Button
                      theme="white"
                      onClick={() => handleOpenFile(post.link)}
                    >
                      <span className="text-info">
                        <i className="material-icons">info</i>
                      </span>{" "}
                      Second Post
                    </Button>
                  ) : null}
                </ButtonGroup>
              </div>
            </div>
          </div>
        ))}
        {open ? <DetailAndComment staffFaulty={staffFaulty} faulty={faulty} data={commentData} /> : null}
      </CardBody>
      <CardFooter className="border-top">
        <Row>
          <Col className="text-center view-report">
            {!viewAll ? (
              <Button theme="white" type="submit" onClick={handleViewAll}>
                Hide Pending Posts
              </Button>
            ) : (
              <Button theme="white" type="submit" onClick={handleViewHide}>
                View All Pending Posts
              </Button>
            )}
          </Col>
        </Row>
      </CardFooter>
    </Card>
  );
};

PendingPosts.propTypes = {
  title: PropTypes.string,
  discussions: PropTypes.array,
};
const mapDispatchToProps = (dispatch) => ({
  setPendingPost: (data) => dispatch(setPendingPost(data)),
  approvePost: (data) => dispatch(approvePost(data)),
  rejectPost: (data) => dispatch(rejectPost(data)),
  fetchEachEventStart: (data) => dispatch(fetchEachEventStart(data)),
});
export default connect(null, mapDispatchToProps)(PendingPosts);
