import React from "react";

import { func, number, shape, string }   from "prop-types";


const propTypes = {
  dataset: shape({
    id: number.isRequired,
    name: string.isRequired
  }).isRequired,
  onDatasetUpdate: func.isRequired
};

const Dataset = (props) => {

  const { dataset, onDatasetUpdate } = props;

  const handleNameChange = (e) => {
    const value = e.target.value;

    onDatasetUpdate({ name: value });
  };

  return (
    <div className="dataset">

      <h2>{dataset.name}</h2>

      <input type="text" value={dataset.name} onChange={handleNameChange} />

      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>

    </div>
  );
};

Dataset.propTypes = propTypes;



export default Dataset;
