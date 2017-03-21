import React from "react";
import classNames from "classnames";


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

const Nav = ({
  pageId = {},
  onNavClick = () => {}}
) => {
  return (
    <nav className="nav">

      {navigationLinks.map(item => {

        const itemClasses = classNames("nav__item", {
          "is-selected": item.page === pageId
            || (item.pages && item.pages.includes(pageId))
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


const { func, string } = React.PropTypes;



Nav.propTypes = {
  pageId: string,
  onNavClick: func
};


export default Nav;
