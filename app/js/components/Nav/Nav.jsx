import React from "react";
import classNames from "classnames";
import { pages, routePropType } from "../routing.js";



const Nav = ({
  route = {},
  onNavClick = () => {}}
) => {
  return (
    <nav className="nav">

      {pages.map(item => {

        const itemClasses = classNames("nav__item", {
          "is-selected": item.page === route.page
        });

        return (
          <div className={itemClasses} key={item.page + item.id}
          onClick={() => onNavClick(item.page, item.id)}>
            {item.label}
          </div>
        );
      })}

    </nav>
  );
};


const {  func } = React.PropTypes;



Nav.propTypes = {
  route: routePropType,
  onNavClick: func
};


export default Nav;
