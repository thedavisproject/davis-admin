import React from "react";


const VariableList = ({variables, onVariableClick}) => {
  return (
    <div className="variable-list">

      {variables.map(i => {
        return(
          <div key={i} className="variable-list__variable"
          onClick={onVariableClick.bind(null, String(i))}>
            Variable {i}
          </div>
        );
      })}

    </div>
  );
};


const { array, func } = React.PropTypes;

VariableList.propTypes = {
  variables: array.isRequired,
  onVariableClick: func.isRequired
};


export default VariableList;
