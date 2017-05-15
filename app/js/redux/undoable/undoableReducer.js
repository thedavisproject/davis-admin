import R from "ramda";
import { getPresent, isHistoryItem } from "./undoableSelectors.js";
import { getActions } from "./undoableActions.js";

const HISTORY_LIMIT = 20;

export default function undoable(actionNamespace, reducer){

  // reducer() (with no arguments) will return the initalState
  const initialState = reducer();

  // get the specific actions for this reducer namespace (eg. DATASET)
  const actions = getActions(actionNamespace);


  return function undoableReducer(state = initialState, action) {

    // get the "present" state to pass to the original reducer
    const presentState = getPresent(state);

    // get what the state should be so we can augment it with the history
    const reducerState = reducer(presentState, action);


    // for each field...
    return R.mapObjIndexed(
      (history, key) => {
        const { type } = action;
        if (type === actions.undo && action.key === key){
          return undo(history);
        }
        else if (type === actions.redo && action.key === key){
          return redo(history);
        }
        else {
          return updateField(key, history, reducerState[key]);
        }
      }
    )(state);

  };

}

// update a single field
function updateField(key, history, newValue){

  if (!isHistoryItem(history)){
    return createHistory(newValue);
  }
  else if (history.present !== newValue){
    return insert(history, newValue);
  }
  else {
    return history;
  }

}


function insert(history, newValue){
  return {
    past: R.takeLast(HISTORY_LIMIT, [...history.past, history.present]),
    present: newValue,
    future: []
  };
}

function undo(history){

  if (history.past.length < 1){
    return history;
  }
  else {
    return {
      past: R.init(history.past),
      present: R.last(history.past),
      future: R.takeLast(HISTORY_LIMIT, [history.present, ...history.future])
    };
  }

}

function redo(history){
  if (history.future.length < 1){
    return history;
  }
  else {
    return {
      past: R.takeLast(HISTORY_LIMIT, [...history.past, history.present]),
      present: R.head(history.future),
      future: R.tail(history.future)
    };
  }
}


function createHistory(value){
  return {
    past: [],
    present: value,
    future: []
  };
}
