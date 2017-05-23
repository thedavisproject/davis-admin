

export function undo(actionNamespace, key){
  return {
    type: getActions(actionNamespace).UNDO,
    key
  };
}

export function redo(actionNamespace, key){
  return {
    type: getActions(actionNamespace).REDO,
    key
  };
}

export function getActions(actionNamespace) {
  return {
    UNDO: `${actionNamespace}/UNDO_EDIT`,
    REDO: `${actionNamespace}/REDO_EDIT`
  };
}
