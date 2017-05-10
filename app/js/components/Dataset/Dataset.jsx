import React from "react";

import { shape, string } from "prop-types";

const propTypes = {
  dataset: shape({
    id: string.isRequired,
    name: string.isRequired
  }).isRequired
};

const Dataset = (props) => {

  const { dataset } = props;


  return (
    <div className="dataset">
      {dataset.name}!

      <br /><br />
      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>

    </div>
  );
};

Dataset.propTypes = propTypes;

export default Dataset;
