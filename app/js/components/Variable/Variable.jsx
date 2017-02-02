import React from "react";


const Variable = ({id}) => {
  return (
    <div className="variable">
      Variable {id}!
    </div>
  );
};


const { string } = React.PropTypes;

Variable.propTypes = {
  id: string
};


export default Variable;
