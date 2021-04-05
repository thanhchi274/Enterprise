import React from "react";
import { Redirect } from "react-router-dom";
import UserLayout from "../layouts/user/UserLayout";
import AdminLayout from "../layouts/admin/Default";
import StaffLayout from "../layouts/staff/Default";
import BlogOverview from "../views/BlogOverview";
import ProfilePage from "../views/UserProfile";
import AddNewPost from "../views/AddNewPost";
import Errors from "../views/Errors";
import BlogPosts from "../views/BlogPosts";
import StaffProfileLite from "../views/StaffProfileLite";
import StaffManage from "../views/StaffManage";
const routeHome = [
  {
    path: "/",
    exact: true,
    layout: UserLayout,
    component: BlogPosts,
  },
  {
    path: "/user-profile",
    layout: UserLayout,
    component: ProfilePage,
  },
  {
    path: "/new-post",
    layout: UserLayout,
    component: AddNewPost,
  },
  {
    path: "/errors",
    layout: UserLayout,
    component: Errors,
  },
];

const routeAdmin = [
  {
    path: "/admin",
    exact: true.valueOf,
    layout: AdminLayout,
    component: BlogOverview,
  },
];

const routeStaff = [
  {
    path: "/staff",
    exact: true,
    layout: StaffLayout,
    component: StaffManage,
  },
  {
    path: "/staff-manage",
    layout: StaffLayout,
    component: StaffManage,
  },
  {
    path: "/staff-profile-lite",
    layout: StaffLayout,
    component: StaffProfileLite,
  },
];
export { routeHome, routeAdmin, routeStaff };
