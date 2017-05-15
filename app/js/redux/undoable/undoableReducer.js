import R from "ramda";
import { getPresent, isHistoryItem } from "./undoableSelectors.js";
import { getActions } from "./undoableActions.js";

const HISTORY_LIMIT = 20;
const DEBOUNCE = 500;

export default function undoable(actionNamespace, reducer){

  // reducer() (with no arguments) will return the initalState
  const initialState = reducer();

  // get the specific actions for this reducer namespace (eg. DATASET)
  const actions = getActions(actionNamespace);

  // return the new reducer
  return function undoableReducer(state = initialState, action = {}) {

    // for each field...
    return R.mapObjIndexed(
      (history, key) => {

        if (action.type === actions.UNDO && action.key === key){
          return undo(history);
        }
        else if (action.type === actions.REDO && action.key === key){
          return redo(history);
        }
        else {
          // get the "present" state (without the history) to pass to the original reducer
          const presentState = getPresent(state);

          // get what the next state should be so we can augment it with the history
          const reducerState = reducer(presentState, action);

          return updateField(history, reducerState[key]);
        }
      }
    )(state);

  };

}


// update a single field
function updateField(history, newValue){

  // create the history object the first time
  if (!isHistoryItem(history)){
    return createHistory(newValue);
  }
  // otherwise, update the value if it's changed
  else if (history.present !== newValue){

    // update the value in place if an update happened recently
    if (Date.now() - history.updated < DEBOUNCE){
      return changeInPlace(history, newValue);
    }
    // otherwise, insert a new history item into the past array
    else {
      return insert(history, newValue);
    }
  }
  // or, return the history object unchanged
  else {
    return history;
  }
}

// create an empty history object with an initial value
function createHistory(value){
  return {
    past: [],
    present: value,
    future: [],
    updated: Date.now()
  };
}

// update the present value without adding to the past array
function changeInPlace(history, newValue){
  return {
    ...history,
    present: newValue,
    updated: Date.now()
  };
}

// update the present value and put the current value in the past array
// will also clear the future
function insert(history, newValue){
  return {
    past: R.takeLast(HISTORY_LIMIT, [...history.past, history.present]),
    present: newValue,
    future: [],
    updated: Date.now()
  };
}


function undo(history){

  // make sure we have a past to grab from
  if (history.past.length > 0) {
    return {
      ...history,
      past: R.init(history.past),
      present: R.last(history.past),
      future: R.takeLast(HISTORY_LIMIT, [history.present, ...history.future])
    };
  }
  else {
    return history;
  }
}


function redo(history){

  // make sure we have a future to grab from
  if (history.future.length > 0){
    return {
      ...history,
      past: R.takeLast(HISTORY_LIMIT, [...history.past, history.present]),
      present: R.head(history.future),
      future: R.tail(history.future)
    };
  }
  else {
    return history;
  }
}
