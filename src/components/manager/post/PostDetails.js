import React from "react";
import ReactTooltip from "react-tooltip";
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import { setEditPost } from "../../../Store/data/data.action";

const PostDetails = ({ post, handleCloseModal, setEditPost }) => {
  const history = useHistory();

  const handleEditPost = (e) => {
    e.preventDefault();

    handleCloseModal();

    history.push("/new-post");

    setTimeout(() => {
      setEditPost(post);
    }, 500);
  };

  return (
    <div>
      {post && post.backgroundImage && (
        <div
          className="blog-post-hero"
          style={{
            backgroundImage: `url(${post.link})`,
          }}
        ></div>
      )}
      <ReactTooltip />
      <main className="container_post_details">
        <div className="card-padding">
          <h2 className="blog__title">
            {!post && <div style={{ textAlign: "center" }}>Post Not found</div>}
            {post && (
              <a>
                {post.title}{" "}
                <a href="#" onClick={handleEditPost}>
                  <i
                    className="material-icons"
                    style={{ fontSize: "25px" }}
                    data-tip="Edit"
                  >
                    create
                  </i>
                </a>
              </a>
            )}
          </h2>
          {post && (
            <div>
              <div className="blog__author">
                <a>
                  <div className="card-post__author d-flex">
                    <a
                      href="#"
                      className="card-post__author-avatar card-post__author-avatar--small"
                      style={{ backgroundImage: `url('${post.authorAvatar}')` }}
                    ></a>
                  </div>
                </a>
                <div className="blog__author-title">
                  by <a href="#">{post.author}</a> on {post.date}
                </div>
                <div className="clearfix"></div>
              </div>
              <div
                className="blog__teaser droid"
                dangerouslySetInnerHTML={{
                  __html: post.body,
                }}
              ></div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setEditPost: (data) => dispatch(setEditPost(data)),
});
export default connect(null, mapDispatchToProps)(PostDetails);
