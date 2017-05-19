import React from "react";
import Undoable from "./Undoable.jsx";

export default Undoable((value, props) => {

  const { options, ...rest } = props;

  return (
    <select value={value} {...rest}>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>{label}</option>
      ))}
    </select>
  );
});
