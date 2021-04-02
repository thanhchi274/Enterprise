import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import  DefaultLayoutUser  from "../layouts/staff/Default";
import  DefaultLayoutAdmin  from "../layouts/admin/Default";
import  DefaultLayoutStaff  from "../layouts/staff/Default";
// Route Views
import BlogOverview from "../views/BlogOverview";
import UserProfileLite from "../views/UserProfileLite";
import AddNewPost from "../views/AddNewPost";
import Errors from "../views/Errors";
import BlogPosts from "../views/BlogPosts";
import StaffProfileLite from '../views/StaffProfileLite'
import StaffManage from '../views/StaffManage'

const routeHome = [
  {
    path: "/",
    exact: true,
    layout: DefaultLayoutUser,
    component: () => <Redirect to="/blog-posts" />,
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayoutUser,
    component: UserProfileLite,
  },
  {
    path: "/add-new-post",
    layout: DefaultLayoutUser,
    component: AddNewPost,
  },
  {
    path: "/errors",
    layout: DefaultLayoutUser,
    component: Errors,
  },
  {
    path: "/blog-posts",
    layout: DefaultLayoutUser,
    component: BlogPosts,
  },
];

const routeAdmin = [
  {
    path: "/",
    layout: DefaultLayoutAdmin,
    component: BlogOverview,
  },
];

const routeStaff = [
  {
    path: "/",
    exact: true,
    layout: DefaultLayoutStaff,
    component: () => <Redirect to="/staff-manage" />,
  },
  {
    path: "/staff-manage",
    layout: DefaultLayoutStaff,
    component: StaffManage,
  },
  {
    path: "/staff-profile-lite",
    layout: DefaultLayoutStaff,
    component: StaffProfileLite

  }
]
export { routeHome, routeAdmin,  routeStaff};
