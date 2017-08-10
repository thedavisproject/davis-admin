import React from "react";
import Undoable from "./Undoable.jsx";

export default Undoable(
  (value, onChange, props) => {

    const handleChange = (e) => {
      onChange(e.target.value);
    };

    return (
      <input type="text" value={value} onChange={handleChange} {...props} />
    );
  }
);