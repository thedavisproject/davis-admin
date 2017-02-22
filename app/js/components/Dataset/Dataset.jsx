import React from "react";


const Dataset = (props) => {
  return (
    <div className="dataset">
      Dataset {props.id}!

      <br /><br />
      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>
    </div>
  );
};


const { string } = React.PropTypes;

Dataset.propTypes = {
  id: string
};


export default Dataset;
