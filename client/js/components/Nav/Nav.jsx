import React from "react";
import R from "ramda";
import { Link, NavLink } from "react-router-dom";
import { removeAuthCookie } from "../Authorization/cookie.js";

export const navigationLinks = [
  {
    page: "",
    isActiveTest: "^/$",
    label: "Home",
  },
  {
    page: "datasets",
    isActiveTest: "^/dataset",
    label: "Datasets"
  },
  {
    page: "variables",
    isActiveTest: "^/variable",
    label: "Variables"
  },
  {
    page: "import",
    isActiveTest: "^/import",
    label: "Import"
  }
];

import {  string } from "prop-types";

const propTypes = {
  pageId: string
};

const handleLogoutClick = e => {
  removeAuthCookie();
};

const Nav = () => {
  return (
    <nav className="nav">

      {navigationLinks.map(item => {

        const isActive = (match, location) => {
          return R.test(RegExp(item.isActiveTest), location.pathname);
        };

        return (
          <NavLink
            key={item.page}
            to={`/${item.page}`}
            className="nav__item"
            activeClassName="is-active"
            isActive={isActive}
          >
            {item.label}
          </NavLink>
        );
      })}


      <Link to="/login" onClick={handleLogoutClick} className="nav__logout">Logout</Link>

    </nav>
  );
};

Nav.propTypes = propTypes;

export default Nav;
