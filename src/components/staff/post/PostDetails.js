import React from "react";

const PostDetails = ({ post }) => {
  return (
    <div>
      {post && post.backgroundImage && (
        <div
          className="blog-post-hero"
          style={{
            backgroundImage: `url(${post.backgroundImage})`,
          }}
        ></div>
      )}
      <main className="container_post_details">
        <div className="card-padding">
          <h2 className="blog__title">
            {!post && <div style={{ textAlign: "center" }}>Post Not found</div>}
            {post && <a>{post.title}</a>}
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

export default PostDetails;
