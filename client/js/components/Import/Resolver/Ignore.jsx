import React from "react";
import { func } from "prop-types";

const propTypes = {
  onResetClick: func.isRequired
};


// we can't memoize this because R.memoize can't tell one fn from another
const handleChangeClick = (fn) => {
  return (e) => {
    e.preventDefault();
    fn(e);
  };
};

const Ignore = ({ onResetClick }) => {

  return (
    <div>
      Ignore <a href="#" onClick={handleChangeClick(onResetClick)}>change</a>
    </div>
  );
};

Ignore.propTypes = propTypes;

export default Ignore;
