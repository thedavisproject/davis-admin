import React from "react";
import { func, node, string } from "prop-types";

const propTypes = {
  style: string.isRequired,
  onClick: func.isRequired,
  children: node
};

// https://github.com/facebook/draft-js/issues/696

const Button = (props) => {

  const { style, onClick, children } = props;

  const handleClick = (e) => {
    e.preventDefault();
    onClick(style);
  };

  return (
    <button type="button" className="rich-text__button" onMouseDown={handleClick}>{children}</button>
  );

};

Button.propTypes = propTypes;

export default Button;
