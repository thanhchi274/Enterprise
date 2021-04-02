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
import { selectComment } from "../../../Store/data/data.selector";
import { setPendingPost } from "../../../Store/data/data.action";

//Images
import authorAvatar from "../../../assets/images/avatars/2.jpg";
import backgroundImage from "../../../assets/images/content-management/13.jpeg";

import PostModal from "../post/PostModal";

const PendingPosts = ({
  title,
  pendingPosts,
  setPendingPost,
  postWithComment,
}) => {
  const [posts, setPosts] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [postDetails, setPostDetails] = React.useState(null);
  const [viewAll, setViewAll] = React.useState(false);

  React.useEffect(() => {
    setPosts(pendingPosts);
  }, []);

  React.useEffect(() => {
    //Update comment in post when user click comment button
    if (postWithComment && posts) {
      const newPendingPosts = posts.filter(
        (item) => item.post.title !== postWithComment.post.title
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
              <img src={post.post.authorAvatar} alt={post.post.author} />
            </div>

            {/* Content */}
            <div
              className="blog-comments__content"
              style={{ marginLeft: "10px", width: "100%" }}
            >
              {/* Content :: Title */}
              <div className="blog-comments__meta text-mutes">
                <a className="text-secondary" href="#">
                  {post.post.author}
                </a>{" "}
                on{" "}
                <a className="text-secondary" href="#">
                  {post.post.title}
                </a>
                <span className="text-mutes">- {post.date}</span>
              </div>

              {/* Content :: Body */}
              <p className="m-0 my-1 mb-2 text-muted">
                <i>
                  {post.comment ? `Comment: ${post.comment}` : "No comment"}
                </i>
              </p>

              {/* Content :: Actions */}
              <div
                className="blog-comments__actions"
                style={{ float: "right" }}
              >
                <ButtonGroup size="sm">
                  <Button theme="white">
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
                    onClick={(e) => handleOpenModal(e, post.post)}
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
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The discussions dataset.
   */
  discussions: PropTypes.array,
};

PendingPosts.defaultProps = {
  title: "Pending Posts",
  pendingPosts: [
    {
      id: 1,
      date: "3 days ago",
      post: {
        backgroundImage,
        category: "Business",
        categoryTheme: "dark",
        author: "Anna Kunis",
        authorAvatar,
        title: "I love you",
        body:
          "However venture pursuit he am mr cordial. Forming musical am hearing studied be luckily. But in for determine what would see...",
        date: "28 February 2019",
      },
    },
    {
      id: 2,
      date: "4 days ago",
      post: {
        backgroundImage,
        category: "Business",
        categoryTheme: "dark",
        author: "Anna Kunis",
        authorAvatar,
        title: "Conduct at an replied removal an amongst",
        body:
          "However venture pursuit he am mr cordial. Forming musical am hearing studied be luckily. But in for determine what would see...",
        date: "28 February 2019",
      },
    },
    {
      id: 3,
      date: "5 days ago",
      post: {
        backgroundImage,
        category: "Business",
        categoryTheme: "dark",
        author: "Anna Kunis",
        authorAvatar,
        title: "Removal an amongst",
        body:
          "However venture pursuit he am mr cordial. Forming musical am hearing studied be luckily. But in for determine what would see...",
        date: "28 February 2019",
      },
    },
    {
      id: 4,
      date: "4 days ago",
      post: {
        backgroundImage,
        category: "Business",
        categoryTheme: "dark",
        author: "Anna Kunis",
        authorAvatar,
        title: "Conduct at an replied removal an amongst",
        body:
          "However venture pursuit he am mr cordial. Forming musical am hearing studied be luckily. But in for determine what would see...",
        date: "28 February 2019",
      },
    },
    {
      id: 5,
      date: "4 days ago",
      post: {
        backgroundImage,
        category: "Business",
        categoryTheme: "dark",
        author: "Anna Kunis",
        authorAvatar,
        title: "Conduct at an replied removal an amongst",
        body:
          "However venture pursuit he am mr cordial. Forming musical am hearing studied be luckily. But in for determine what would see...",
        date: "28 February 2019",
      },
    },
  ],
};

const mapStateToProps = createStructuredSelector({
  postWithComment: selectComment,
});
const mapDispatchToProps = (dispatch) => ({
  setPendingPost: (data) => dispatch(setPendingPost(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PendingPosts);
