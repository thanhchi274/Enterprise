/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { Container, Row } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import PostListOne from "../components/user/post/PostListOne";
import PostListTwo from "../components/user/post/PostListTwo";
import backgroundImage from "../assets/images/content-management/1.jpeg";
import authorAvatar from "../assets/images/avatars/1.jpg";
class BlogPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PostsListOne: [
        {
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
        {
          backgroundImage,
          category: "Travel",
          categoryTheme: "info",
          author: "James Jamerson",
          authorAvatar,
          title: "Off tears are day blind smile alone had ready",
          body:
            "Is at purse tried jokes china ready decay an. Small its shy way had woody downs power. To denoting admitted speaking learning my...",
          date: "29 February 2019",
        },
        {
          backgroundImage,
          category: "Technology",
          categoryTheme: "royal-blue",
          author: "Jimmy Jackson",
          authorAvatar,
          title: "Difficult in delivered extensive at direction",
          body:
            "Is at purse tried jokes china ready decay an. Small its shy way had woody downs power. To denoting admitted speaking learning my...",
          date: "29 February 2019",
        },
        {
          backgroundImage,
          category: "Business",
          categoryTheme: "warning",
          author: "John James",
          authorAvatar,
          title: "It so numerous if he may outlived disposal",
          body:
            "How but sons mrs lady when. Her especially are unpleasant out alteration continuing unreserved ready road market resolution...",
          date: "29 February 2019",
        },
        {
          backgroundImage,
          category: "Technology",
          categoryTheme: "royal-blue",
          author: "Jimmy Jackson",
          authorAvatar,
          title: "Difficult in delivered extensive at direction",
          body:
            "Is at purse tried jokes china ready decay an. Small its shy way had woody downs power. To denoting admitted speaking learning my...",
          date: "29 February 2019",
        },
        {
          backgroundImage,
          category: "Business",
          categoryTheme: "warning",
          author: "John James",
          authorAvatar,
          title: "It so numerous if he may outlived disposal",
          body:
            "How but sons mrs lady when. Her especially are unpleasant out alteration continuing unreserved ready road market resolution...",
          date: "29 February 2019",
        },{
          backgroundImage,
          category: "Technology",
          categoryTheme: "royal-blue",
          author: "Jimmy Jackson",
          authorAvatar,
          title: "Difficult in delivered extensive at direction",
          body:
            "Is at purse tried jokes china ready decay an. Small its shy way had woody downs power. To denoting admitted speaking learning my...",
          date: "29 February 2019",
        },
        {
          backgroundImage,
          category: "Business",
          categoryTheme: "warning",
          author: "John James",
          authorAvatar,
          title: "It so numerous if he may outlived disposal",
          body:
            "How but sons mrs lady when. Her especially are unpleasant out alteration continuing unreserved ready road market resolution...",
          date: "29 February 2019",
        },{
          backgroundImage,
          category: "Technology",
          categoryTheme: "royal-blue",
          author: "Jimmy Jackson",
          authorAvatar,
          title: "Difficult in delivered extensive at direction",
          body:
            "Is at purse tried jokes china ready decay an. Small its shy way had woody downs power. To denoting admitted speaking learning my...",
          date: "29 February 2019",
        },
        {
          backgroundImage,
          category: "Business",
          categoryTheme: "warning",
          author: "John James",
          authorAvatar,
          title: "It so numerous if he may outlived disposal",
          body:
            "How but sons mrs lady when. Her especially are unpleasant out alteration continuing unreserved ready road market resolution...",
          date: "29 February 2019",
        },{
          backgroundImage,
          category: "Technology",
          categoryTheme: "royal-blue",
          author: "Jimmy Jackson",
          authorAvatar,
          title: "Difficult in delivered extensive at direction",
          body:
            "Is at purse tried jokes china ready decay an. Small its shy way had woody downs power. To denoting admitted speaking learning my...",
          date: "29 February 2019",
        },
        {
          backgroundImage,
          category: "Business",
          categoryTheme: "warning",
          author: "John James",
          authorAvatar,
          title: "It so numerous if he may outlived disposal",
          body:
            "How but sons mrs lady when. Her especially are unpleasant out alteration continuing unreserved ready road market resolution...",
          date: "29 February 2019",
        },
      ],
    };
  }

  render() {
    const { PostsListOne } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Magazine"
            subtitle="Your Post"
            className="text-sm-left"
          />
        </Row>
        <Row>
          {PostsListOne.map((post, idx) => (
            <PostListOne post={post} key={idx} />
          ))}
        </Row>
      </Container>
    );
  }
}

export default BlogPosts;
