import React from "react";
import R from "ramda";
import UndoableTextInput from "../Undoable/UndoableTextInput.jsx";

import { func, shape, string } from "prop-types";

const propTypes = {
  onFieldChange: func.isRequired,
  dataset: shape({
    id: string.isRequired,
    name: string.isRequired,
    info: string.isRequired
  }).isRequired,
};

const Dataset = (props) => {
  const { onChange, dataset } = props;
  const { info } = dataset;

  const updateField = R.curry((key, value) => {
    onChange(R.merge(dataset, {
      [key]: value
    }));
  });

  return (
    <div className="dataset">


      {/* <UndoableTextInput value={info} onChange={updateField("info")} /> */}

      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>

    </div>
  );
};

Dataset.propTypes = propTypes;

export default Dataset;
