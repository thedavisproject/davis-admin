

export function undo(actionNamespace, key){
  return {
    type: getActions(actionNamespace).undo,
    key
  };
}

export function redo(actionNamespace, key){
  return {
    type: getActions(actionNamespace).redo,
    key
  };
}


export function getActions(actionNamespace) {
  return {
    undo: `${actionNamespace}/UNDO`,
    redo: `${actionNamespace}/REDO`
  };
}
