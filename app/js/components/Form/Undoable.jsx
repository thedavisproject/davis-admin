import React from "react";
import { any, array, func, shape, string } from "prop-types";

export const historyType = shape({
  past: array,
  present: any,
  future: array
});

const propTypes = {
  history: historyType.isRequired,
  label: string.isRequired,
  onUndoClick: func.isRequired,
  onRedoClick: func.isRequired
};


/**
 * Higher order component to create an Undoable version of a field component
 * @param {Func} renderValue (value, props -> component)
 * @returns {Func} React component
 */
const Undoable = (renderValue) => {

  const UndoableField = (props) => {

    const { label, history, onRedoClick, onUndoClick, ...rest } = props;


    return (
      <div className="undoable">
        <div className="undoable__top">
          <label className="undoable__label">{label}</label>
          <div className="undo-btns undoable__undo-btns">
            <button type="button" disabled={(history.past.length < 1)} className="btn--undo" onClick={onUndoClick}>undo</button>
            <button type="button" disabled={(history.future.length < 1)} className="btn--redo" onClick={onRedoClick}>redo</button>
          </div>
        </div>
        <div className="undoable__field">
          {renderValue(history.present, rest)}
        </div>

      </div>
    );
  };

  UndoableField.propTypes = propTypes;

  return UndoableField;
};

export default Undoable;
