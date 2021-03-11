import { lazy } from "react";
//User Page Route
import HomePage from "../pages/user/Blog";
import SignUpPage from "../pages/user/sign-up/SignUp";
import MagazinePage from '../pages/user/upload/upload.component'
import AdminDashboard from "../pages/admin/layouts/Default";
const routeHome = [
  {
    path: "/",
    exact: true,
    Component: HomePage,
  },
  {
    path: "/sign-up",
    exact: true,
    Component: SignUpPage,
  },
  {
    path:'/magazine',
    exact:true,
    Component:MagazinePage
  }
];
const routeAdminStaff = [
  {
    path: "/admin",
    exact: true,
    Component: AdminDashboard,
  },
];
export { routeHome, routeAdminStaff };
