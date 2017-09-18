import React from "react";
import R from "ramda";

import { func, oneOf, string } from "prop-types";
import { types } from "../redux/resolverState.js";


const propTypes = {
  name: string.isRequired,
  onSubmit: func.isRequired,
  onNameChange: func.isRequired,
  onTypeChange: func.isRequired,
  type: oneOf(types.map(R.prop("value"))),
};

const New = ({ onSubmit, name, onNameChange, type, onTypeChange }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e.target.name.value);
  };

  const handleNameChange = (e) => {
    e.preventDefault();
    onNameChange(e.target.value);
  };

  const handleTypeChange = (e) => {
    onTypeChange(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name: <input type="text" name="name" value={name} onChange={handleNameChange}/> <button type="submit">Submit</button>
      </div>
      <div>
        Type: {types.map(t => (
          <label key={t.value}>
            <input
              key={t.value}
              type="radio"
              name={`variable-type-${name}`}
              value={t.value}
              checked={t.value === type}
              onChange={handleTypeChange}
            /> { t.label }
          </label>
        ))}
      </div>
    </form>
  );
};

New.propTypes = propTypes;

export default New;
