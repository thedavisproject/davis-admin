import React from "react";
import R from "ramda";
import classNames from "classnames";
import { arrayOf, func, node, oneOfType, string } from "prop-types";

const propTypes = {
  style: string.isRequired,
  current: oneOfType([string, arrayOf(string)]),
  onClick: func.isRequired,
  children: node
};

// https://github.com/facebook/draft-js/issues/696

const Button = (props) => {

  const { children, current, onClick, style } = props;

  const handleClick = (e) => {
    e.preventDefault();
    onClick(style);
  };

  const classes = classNames("rich-text__button", {
    "is-selected": (Array.isArray(current))
      ? R.contains(style, current)
      : current === style
  });

  return (
    <button type="button" className={classes} onMouseDown={handleClick}>{children}</button>
  );

};

Button.propTypes = propTypes;

export default Button;
