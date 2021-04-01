import React from "react";
import { NavItem, NavLink, Badge, Collapse, DropdownItem } from "shards-react";

import authorAvatar from "../../../../../assets/images/avatars/1.jpg";
import backgroundImage from "../../../../../assets/images/content-management/11.jpeg";
import NotificationItem from "./NotificationItem";

const notificationList = [
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
    seen: false,
  },
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
    seen: false,
  },
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
    seen: false,
  },
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
    seen: false,
  },
];

export default class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      rerender: false,
    };

    this.toggleNotifications = this.toggleNotifications.bind(this);
    this.getNotificationUnread = this.getNotificationUnread.bind(this);
    this.rerender = this.rerender.bind(this);
  }

  toggleNotifications() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  getNotificationUnread() {
    return notificationList.filter((item) => !item.seen).length;
  }

  rerender() {
    this.setState({
      ...this.state,
      rerender: !this.state.rerender,
    });
  }

  render() {
    return (
      <NavItem className="border-right dropdown notifications">
        <NavLink
          className="nav-link-icon text-center"
          onClick={this.toggleNotifications}
        >
          <div className="nav-link-icon__wrapper">
            <i className="material-icons hover">&#xE7F4;</i>
            {this.getNotificationUnread() !== 0 && (
              <Badge pill theme="danger">
                {this.getNotificationUnread()}
              </Badge>
            )}
          </div>
        </NavLink>
        <Collapse
          open={this.state.visible}
          className="dropdown-menu dropdown-menu-small"
        >
          {notificationList.map((item, idx) => (
            <NotificationItem
              notification={item}
              key={idx}
              rerender={this.rerender}
            />
          ))}
        </Collapse>
      </NavItem>
    );
  }
}
