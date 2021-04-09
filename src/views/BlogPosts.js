/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useState, useEffect } from "react";
import { Container, Row } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import PostListOne from "../components/user/post/PostListOne";
import DownloadAllPost from "../components/manager/post/DownloadAllPost";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchMagazinePostStart } from "../Store/data/data.action";
import { selectMagazinePost } from "../Store/data/data.selector";
import {selectCurrentUser} from '../Store/user/user.selector';
import {Redirect} from 'react-router-dom'
const styleManager = {
  display: "flex",
  justifyContent: "space-between",
}
const BlogPosts = ({ fetchMagazinePostStart, data, role,user}) => {
  useEffect(() => {
    fetchMagazinePostStart();
  }, [fetchMagazinePostStart]);
  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4" style={styleManager}>
        <PageTitle
          sm="4"
          title="Magazine"
          subtitle="Your Post"
          className="text-sm-left"
          style={{width: "20%"}}
        />
        {role === "manager" && <DownloadAllPost allPosts={data}/>}
      </Row>
      <Row>
        {data
          ? data.map((post, idx) => (
              <PostListOne post={post} key={idx} role={role} />
            ))
          : null}
      </Row>
    </Container>
  )
};
const mapStateToProps = createStructuredSelector({
  user:selectCurrentUser,
  data: selectMagazinePost,
});
const mapDispatchToProps = {
  fetchMagazinePostStart: (data) => fetchMagazinePostStart(data),
};
export default connect(mapStateToProps, mapDispatchToProps)(BlogPosts);
