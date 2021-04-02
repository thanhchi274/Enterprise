export const routeUser = [
  {
    title: "Blog Posts",
    htmlBefore: '<i class="material-icons">vertical_split</i>',
    to: "/blog-posts",
  },
  {
    title: "Add New Post",
    htmlBefore: '<i class="material-icons">note_add</i>',
    to: "/add-new-post",
  },
  {
    title: "User Profile",
    htmlBefore: '<i class="material-icons">person</i>',
    to: "/user-profile-lite",
  },
];

export const routeAdmin = [
  {
    title: "Blog Dashboard",
    to: "/blog-overview",
    htmlBefore: '<i class="material-icons">edit</i>',
    htmlAfter: "",
  },
];

export const routeStaff = [
  {
    title: "Staff manage",
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