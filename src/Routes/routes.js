import React from "react";
import { Redirect } from "react-router-dom";
import UserLayout from "../layouts/user/UserLayout";
import AdminLayout from "../layouts/admin/Default";
import GuestLayout from "../layouts/guest/Default";
import ManagerLayout from "../layouts/manager/Default";
import StaffLayout from "../layouts/staff/Default";
import BlogOverview from "../views/BlogOverview";
import ProfilePage from "../views/UserProfile";
import AddNewPost from "../views/AddNewPost";
import Home from "../views/Home";
import Errors from "../views/Errors";
import BlogPosts from "../views/BlogPosts";
import TermsAndConditionsPage from "../views/Term&Condition";
import StaffProfileLite from "../views/StaffProfileLite";
import StaffManage from "../views/StaffManage";
import SetClosureDates from "../views/SetClosureDates";

const routeStudent = [
  {
    path: "/blog-posts",
    exact: true,
    layout: UserLayout,
    component: () => <BlogPosts role="student"/>,
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
  {
    path: "/terms-and-conditions",
    exact: true,
    layout: UserLayout,
    component: TermsAndConditionsPage,
  },
];

const routeAdmin = [
  {
    path: "/set-closure-dates",
    exact: true,
    layout: AdminLayout,
    component: SetClosureDates,
  },
];

const routeGuest = [
  {
    path: "/",
    exact: true,
    layout: GuestLayout,
    component: Home,
  },
];

const routeManager = [
  {
    path: "/all-posts",
    exact: true,
    layout: ManagerLayout,
    component: () => <BlogPosts role="manager" />,
  },
  {
    path: "/statistic",
    exact: true,
    layout: ManagerLayout,
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
    path: "/staff-profile",
    layout: StaffLayout,
    component: StaffProfileLite,
  },
];
export { routeStudent, routeAdmin, routeStaff, routeManager, routeGuest };
