import R from "ramda";

const HISTORY_LIMIT = 50;
const DEBOUNCE = 500;

// update a single field
export function update(history, newValue){

  // update the value if it's changed
  // using R.equals to check deep equality if the value is an object/array
  if (!R.equals(history.present, newValue)){

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
export function createHistory(value = ""){
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


export function undo(history){

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


export function redo(history){

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
