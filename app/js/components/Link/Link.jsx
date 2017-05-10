import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import { routeToUrl } from "../../redux/routing/routing.js";
import { navigateTo } from "../../redux/routing/routing-actions.js";

import { func, node, shape, string } from "prop-types";

const propTypes = {
  // route can contain other args too
  route: shape({
    page: string.isRequired,
    id: string
  }).isRequired,
  children: node,
  className: string,
  onClick: func
};

const Link = (props) => {

  const { route, children, className, onClick, ...otherProps } = props;

  const handleOnClick = (e) => {

    // if this is regular click with no modifier keys (shift, cmd, ctrl, etc)
    // https://facebook.github.io/react/docs/events.html#mouse-events
    const isRegularClick = (!e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey);

    // if this is a regular click, intercept it so we can pushState
    if (isRegularClick){
      e.preventDefault();
      onClick(route);
    }

    // clicks with eg. ctrl/cmd to "open in new tab" will follow the href
  };

  return (
    <a href={routeToUrl(route)}
      className={classNames("link", className)}
      onClick={handleOnClick}
      {...otherProps}
    >
      {children}
    </a>
  );
};

Link.propTypes = propTypes;


/** connect to redux so we can fire navigateTo **/

function mapDispatchToProps(dispatch) {
  return {
    onClick: (route) => {
      dispatch(navigateTo(route));
    }
  };
}

export default connect(null, mapDispatchToProps)(Link);
