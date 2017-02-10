import React from "react";
import classNames from "classnames";
import { routePropType } from "../routes.js";


export const navigationLinks = [
  {
    page: "",
    label: "Home"
  },
  {
    page: "datasets",
    label: "Datasets"
  },
  {
    page: "variables",
    label: "Variables"
  },
  {
    page: "attributes",
    label: "Attributes"
  }
];

const Nav = ({
  route = {},
  onNavClick = () => {}}
) => {
  return (
    <nav className="nav">

      {navigationLinks.map(item => {

        const itemClasses = classNames("nav__item", {
          "is-selected": item.page === route.page
        });

        return (
          <div className={itemClasses} key={item.page}
          onClick={() => onNavClick(item.page)}>
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
