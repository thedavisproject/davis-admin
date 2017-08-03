import React from "react";
import { Link } from "react-router-dom";

import { arrayOf, number, shape, string } from "prop-types";

const propTypes = {
  variables: arrayOf(shape({
    id: number.isRequired,
    name: string.isRequired
  })).isRequired
};

const VariableList = ({ variables }) => {
  return (
    <div className="variable-list">

      {variables.map(variable => {
        return(
          <Link key={variable.id}
            to={`/variable/${variable.id}`}
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
