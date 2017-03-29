import React from "react";
import Link from "../Link/Link.jsx";

const VariableList = ({variables}) => {
  return (
    <div className="variable-list">

      {variables.map(variable => {
        return(
          <Link route={{page: "variable", id: variable.id}}
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


const { arrayOf, shape, string } = React.PropTypes;

VariableList.propTypes = {
  variables: arrayOf(shape({
    id: string.isRequired,
    name: string.isRequired
  })).isRequired
};


export default VariableList;
