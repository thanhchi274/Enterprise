import React from "react";
import { Nav } from "shards-react";

import SidebarNavItem from "./SidebarNavItem";

import { routeManager } from "../../../../data/sidebar-nav-items";

class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navItems: routeManager,
    };
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    this.onChange();
  }

  componentWillUnmount() {
    this.onChange();
  }

  onChange() {}

  render() {
    const { navItems: items } = this.state;

    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {items.map((item, idx) => (
            <SidebarNavItem key={idx} item={item} />
          ))}
        </Nav>
      </div>
    );
  }
}

export default SidebarNavItems;
