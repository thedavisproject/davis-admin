import React from "react";

import { shape, string } from "prop-types";

const propTypes = {
  variable: shape({
    id: string.isRequired,
    name: string.isRequired
  }).isRequired
};

const Variable = (props) => {

  const { name } = props.variable;

  return (
    <div className="variable">
      {name}!

      <br /><br />
      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>

    </div>
  );
};

Variable.propTypes = propTypes;

export default Variable;
