import React from "react";
import Link from "../Link/Link.jsx";

import { arrayOf, shape, string } from "prop-types";

const propTypes = {
  variables: arrayOf(shape({
    id: string.isRequired,
    name: string.isRequired
  })).isRequired
};

const VariableList = ({ variables }) => {
  return (
    <div className="variable-list">

      {variables.map(variable => {
        return(
          <Link route={{ page: "variable", id: variable.id }}
            key={variable.id}
            className="variable-list__variable"
          >
            {variable.name}
          </Link>
        );
      })}

    </div>
  );
};

VariableList.propTypes = propTypes;

export default VariableList;
