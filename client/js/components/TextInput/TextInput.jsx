import React from "react";
import R from "ramda";
import { func } from "prop-types";

const propTypes = {
  onChange: func.isRequired
};

const TextInput = (props) => {

  const { onChange, ...rest } = props;

  return (
    <input
      type="text"
      onChange={handleChange(onChange)}
      {...rest}
    />
  );
};


const handleChange = R.curry((onChange, e) => {
  return onChange(e.target.value);
});


TextInput.propTypes = propTypes;

export default TextInput;
