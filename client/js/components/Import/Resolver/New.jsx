import React from "react";

import { func, string } from "prop-types";

const propTypes = {
  onSubmit: func.isRequired,
  name: string.isRequired,
  onNameChange: func.isRequired
};

const New = ({ onSubmit, name, onNameChange }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e.target.name.value);
  };

  const handleNameChange = (e) => {
    e.preventDefault();
    onNameChange(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      Name: <input type="text" name="name" value={name} onChange={handleNameChange}/> <button type="submit">Submit</button>
    </form>
  );
};

New.propTypes = propTypes;

export default New;
