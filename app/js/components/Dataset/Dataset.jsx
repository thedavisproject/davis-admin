import React from "react";

import { func, shape } from "prop-types";
import Undoable, { historyType } from "../Form/Undoable.jsx";
import SingleLine from "../Form/SingleLine.jsx";

const UndoableSingleLine = Undoable(SingleLine);

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
      <div style={{ paddingBottom: 10 }}>
        <UndoableSingleLine
          key={key}
          label={key}
          history={dataset[key]}
          onChange={(e) => onFieldChange(key, e.target.value)}
          onUndoClick={(e) => onUndoClick(key, e)}
          onRedoClick={(e) => onRedoClick(key, e)}
        />
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
