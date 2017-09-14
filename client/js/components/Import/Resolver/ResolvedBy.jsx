import React from "react";

import { func, oneOf, string } from "prop-types";

const propTypes = {
  method: oneOf(["choose", "new", "ignore"]).isRequired,
  display: string,
  onMethodClear: func.isRequired
};

const renderMethod = ({ method, display }) => {

  switch(method){
    case "choose":
      return `Chosen: ${display}`;

    case "new":
      return `New: ${display}`;

    case "ignore":
      return "Ignore";
  }

};

const ResolvedBy = ({ method, display, onMethodClear }) => {

  const handleChangeClick = (e) => {
    e.preventDefault();
    onMethodClear(e);
  };

  return (
    <div>
      {renderMethod({ method, display })}  <a href="#" onClick={handleChangeClick}>change</a>
    </div>
  );

};

ResolvedBy.propTypes = propTypes;

export default ResolvedBy;
