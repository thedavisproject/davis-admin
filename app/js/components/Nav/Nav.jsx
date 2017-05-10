import React from "react";
import classNames from "classnames";
import Link from "../Link/Link.jsx";

export const navigationLinks = [
  {
    page: "",
    label: "Home"
  },
  {
    page: "datasets",
    pages: ["dataset", "datasets"],
    label: "Datasets"
  },
  {
    page: "variables",
    pages: ["variable", "variables"],
    label: "Variables"
  }
];

import {  string } from "prop-types";

const propTypes = {
  pageId: string
};

const Nav = ({ pageId = {} }) => {
  return (
    <nav className="nav">

      {navigationLinks.map(item => {

        const itemClasses = classNames("nav__item", {
          "is-selected": item.page === pageId
            || (item.pages && item.pages.includes(pageId))
        });

        return (
          <Link route={{ page: item.page }} className={itemClasses} key={item.page}>
            {item.label}
          </Link>
        );
      })}

    </nav>
  );
};

Nav.propTypes = propTypes;

export default Nav;
