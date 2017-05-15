import R from "ramda";
import { getPresent, isHistoryItem } from "./undoableSelectors.js";

const HISTORY_LIMIT = 20;

export default function undoable(reducer){

  // reducer() (with no arguments) will return the initalState
  const initialState = reducer();


  return function undoableReducer(state = initialState, action) {

    // get the "present" state to pass to the original reducer
    const presentState = getPresent(state);

    // get what the state should be so we can augment it with the history
    const reducerState = reducer(presentState, action);


    // for each field
    const newState = R.mapObjIndexed(
      (history, key) => updateField(key, history, reducerState[key])
    )(state);



    return newState;
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


function createHistory(value){
  return {
    past: [],
    present: value,
    future: []
  };
}
