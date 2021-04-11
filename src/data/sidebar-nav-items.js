export const routeUser = [
  {
    title: "Blog Posts",
    htmlBefore: '<i class="material-icons">vertical_split</i>',
    to: "/blog-posts",
  },
  {
    title: "Add New Post",
    htmlBefore: '<i class="material-icons">note_add</i>',
    to: "/new-post",
  },
  {
    title: "User Profile",
    htmlBefore: '<i class="material-icons">person</i>',
    to: "/user-profile",
  },
];

export const routeAdmin = [
  {
    title: "Set Closure Dates",
    to: "/set-closure-dates",
    htmlBefore: '<i class="material-icons">date_range</i>',
    htmlAfter: "",
  },
];

export const routeStaff = [
  {
    title: "Staff Dashboard",
    to: "/staff",
    htmlBefore: '<i class="material-icons">edit</i>',
    htmlAfter: "",
  },
  {
    title: "Staff Profile",
    to: "/staff-profile",
    htmlBefore: '<i class="material-icons">person</i>',
    htmlAfter: "",
  },
];

export const routeManager = [
  {
    title: "Statistic",
    to: "/statistic",
    htmlBefore: '<i class="material-icons">analytics</i>',
    htmlAfter: "",
  },
];