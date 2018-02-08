import React from "react";
import Undoable from "./UndoableHOC.jsx";

import { any, array } from "prop-types";

const Dropdown = (props) => {

  const { options, value, ...rest } = props;

  return (
    <select value={value} {...rest}>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>{label}</option>
      ))}
    </select>
  );
};

Dropdown.propTypes = {
  options: array.isRequired,
  value: any.isRequired
};

export default Undoable((value, onChange, props) => <Dropdown value={value} {...props} /> );
