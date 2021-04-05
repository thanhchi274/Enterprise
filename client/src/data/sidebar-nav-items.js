export const routeUser = [
  {
    title: "Student HomePage",
    htmlBefore: '<i class="material-icons">vertical_split</i>',
    to: "/",
  },
  {
    title: "Student | Add New Post",
    htmlBefore: '<i class="material-icons">note_add</i>',
    to: "/new-post",
  },
  {
    title: "Student Profile",
    htmlBefore: '<i class="material-icons">person</i>',
    to: "/user-profile",
  },
];

export const routeAdmin = [
  {
    title: "Admin Dashboard",
    to: "/blog-overview",
    htmlBefore: '<i class="material-icons">edit</i>',
    htmlAfter: "",
  },
];

export const routeStaff = [
  {
    title: "Staff Dashboard",
    to: "/staff-manage",
    htmlBefore: '<i class="material-icons">edit</i>',
    htmlAfter: "",
  },
  {
    title: "Staff profile",
    to: "/staff-profile-lite",
    htmlBefore: '<i class="material-icons">person</i>',
    htmlAfter: "",
  },
];