import React from "react";


const VariableList = ({variables, onVariableClick}) => {
  return (
    <div className="variable-list">

      {variables.map(variable => {

        const onClick = (e) => {
          onVariableClick(variable.id);
        };

        return(
          <div key={variable.id} className="variable-list__variable"
          onClick={onClick}>
            {variable.name}
          </div>
        );
      })}

    </div>
  );
};


const { arrayOf, func, shape, string } = React.PropTypes;

VariableList.propTypes = {
  variables: arrayOf(shape({
    id: string.isRequired,
    name: string.isRequired
  })).isRequired,
  onVariableClick: func.isRequired
};


export default VariableList;
