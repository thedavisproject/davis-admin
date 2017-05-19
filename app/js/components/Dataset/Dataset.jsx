import React from "react";

import { func, shape }   from "prop-types";
import { historyType }   from "../Form/Undoable.jsx";
import UndoableTextInput from "../Form/UndoableTextInput.jsx";
import UndoableTextArea  from "../Form/UndoableTextArea.jsx";
import UndoableDropdown  from "../Form/UndoableDropdown.jsx";

const propTypes = {
  dataset: shape({
    id: historyType.isRequired,
    name: historyType.isRequired,
    info: historyType.isRequired
  }).isRequired,
  onFieldChange: func.isRequired,
  onUndoClick: func.isRequired,
  onRedoClick: func.isRequired
};

const Dataset = (props) => {

  const { dataset, onFieldChange, onUndoClick, onRedoClick } = props;

  const renderTextInput = (key) => {
    return (
      <UndoableTextInput
        key={key}
        label={key}
        history={dataset[key]}
        onChange={(e) => onFieldChange(key, e.target.value)}
        onUndoClick={(e) => onUndoClick(key, e)}
        onRedoClick={(e) => onRedoClick(key, e)}
      />
    );
  };

  const renderTextArea = (key) => {
    return (
      <UndoableTextArea
        key={key}
        label={key}
        history={dataset[key]}
        onChange={(e) => onFieldChange(key, e.target.value)}
        onUndoClick={(e) => onUndoClick(key, e)}
        onRedoClick={(e) => onRedoClick(key, e)}
      />
    );
  };


  const renderDropdown = (key, label, options) => {
    return (
      <UndoableDropdown
        label={label}
        history={dataset[key]}
        options={options}
        onChange={(e) => onFieldChange(key, e.target.value)}
        onUndoClick={(e) => onUndoClick(key, e)}
        onRedoClick={(e) => onRedoClick(key, e)}
      />
    );
  };

  const colorOptions = [
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" }
  ];


  return (
    <div className="dataset">

      {renderTextInput("name")}
      {renderTextArea("info")}
      {renderDropdown("color", "Favorite Color", colorOptions)}

      <br /><br />

      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>

    </div>
  );
};

Dataset.propTypes = propTypes;



export default Dataset;
