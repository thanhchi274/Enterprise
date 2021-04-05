export const routeUser = [
  {
    title: "Student HomePage",
    htmlBefore: '<i class="material-icons">vertical_split</i>',
    to: "/",
  }
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