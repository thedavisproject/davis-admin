import React from "react";
import { any, array, bool, func, shape, string } from "prop-types";

export const historyType = shape({
  past: array,
  present: any,
  future: array
});

const propTypes = {
  children: any,
  history: historyType,
  isEditing: bool,
  label: string,
  onUndoClick: func.isRequired,
  onRedoClick: func.isRequired
};

const Undoable = (FieldComponent) => {

  const UndoableField = (props) => {

    const { label, history, onRedoClick, onUndoClick, ...rest } = props;


    return (
      <div className="undoable-field">
        <div className="undoable-field__top">
          <label className="undoable-field__label">{label}</label>
          <div className="undo-btns undoable-field__undo-btns">
            <button type="button" disabled={(history.past.length < 1)} className="btn--undo" onClick={onUndoClick}>undo</button>
            <button type="button" disabled={(history.future.length < 1)} className="btn--redo" onClick={onRedoClick}>redo</button>
          </div>
        </div>
        <div className="undoable-field__field">
          <FieldComponent contentEditable={true} value={history.present} {...rest} />
        </div>

      </div>
    );
  };

  UndoableField.propTypes = propTypes;

  return UndoableField;
};

export default Undoable;
