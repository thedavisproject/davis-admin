import React from "react";

import { func, shape }   from "prop-types";
import { historyType }   from "../Form/UndoableHOC.jsx";
import UndoableTextInput from "../Form/UndoableTextInput.jsx";
import UndoableTextArea  from "../Form/UndoableTextArea.jsx";
import UndoableDropdown  from "../Form/UndoableDropdown.jsx";
import UndoableRichtext  from "../Form/UndoableRichtext.jsx";

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

  const renderTextInput = (key, label) => {
    return (
      <UndoableTextInput
        key={key}
        label={label}
        history={dataset[key]}
        onChange={(e) => onFieldChange(key, e.target.value)}
        onUndoClick={(e) => onUndoClick(key, e)}
        onRedoClick={(e) => onRedoClick(key, e)}
      />
    );
  };

  const renderTextArea = (key, label) => {
    return (
      <UndoableTextArea
        key={key}
        label={label}
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

  const renderRichText = (key, label) => {
    return (
      <UndoableRichtext
        label={label}
        history={dataset[key]}
        onChange={(editorState) => onFieldChange(key, editorState)}
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

      {renderTextInput("name", "Name")}
      {renderRichText("info", "Info")}
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
