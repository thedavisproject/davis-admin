import React from "react";

import { func, number, shape, string }   from "prop-types";
import { historyType }   from "../Form/Undoable.jsx";


const propTypes = {
  dataset: shape({
    id: number.isRequired,
    name: string.isRequired
  }).isRequired
};

const Dataset = (props) => {

  const { dataset } = props;

  return (
    <div className="dataset">

      <h2>{dataset.name}</h2>

      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>

    </div>
  );
};

Dataset.propTypes = propTypes;



export default Dataset;
