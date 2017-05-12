import React from "react";

import { func, shape, string } from "prop-types";


const propTypes = {
  dataset: shape({
    id: string.isRequired,
    name: string.isRequired
  }).isRequired,
  onFieldChange: func.isRequired
};

const Dataset = (props) => {

  const { dataset, onFieldChange } = props;

  const renderTextInput = (key) => {
    return (
      <div style={{ paddingBottom: 10 }}>
        <label>
          {key}: <input type="text" value={dataset[key]} onChange={(e) => onFieldChange(key, e.target.value)}/>
        </label>
      </div>
    );
  };


  return (
    <div className="dataset">

      {renderTextInput("name")}
      {renderTextInput("info")}

      <br /><br />

      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>

    </div>
  );
};

Dataset.propTypes = propTypes;



export default Dataset;
