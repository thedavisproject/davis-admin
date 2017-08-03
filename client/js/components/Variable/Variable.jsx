import React from "react";

import { number, shape, string } from "prop-types";

const propTypes = {
  variable: shape({
    id: number.isRequired,
    name: string.isRequired
  }).isRequired
};

const Variable = (props) => {

  const { name } = props.variable;

  return (
    <div className="variable">
      <h2>{name}</h2>

      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>

    </div>
  );
};

Variable.propTypes = propTypes;

export default Variable;
