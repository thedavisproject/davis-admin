import React from "react";


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


const { shape, string } = React.PropTypes;

Variable.propTypes = {
  variable: shape({
    id: string.isRequired,
    name: string.isRequired
  }).isRequired
};


export default Variable;
