import React from "react";
import { DropdownItem } from "shards-react";

import PostModal from "../../../post/PostModal";

const NotificationItem = ({ notification, rerender }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpenModal = () => {
    notification.seen = true;
    rerender();
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      {!notification.seen && (
        <DropdownItem onClick={handleOpenModal}>
          <div className="notification__icon-wrapper">
            <div className="notification__icon">
              <div className="card-post__author d-flex">
                <a
                  href="#"
                  className="card-post__author-avatar card-post__author-avatar--small"
                  style={{
                    backgroundImage: `url('${notification.authorAvatar}')`,
                  }}
                ></a>
              </div>
            </div>
          </div>
          <div className="notification__content">
            <span className="notification__category">
              {notification.category}
            </span>
            <p>{notification.title}</p>
          </div>
        </DropdownItem>
      )}
      <PostModal
        open={open}
        handleCloseModal={handleCloseModal}
        post={notification}
      />
    </>
  );
};

export default NotificationItem;
