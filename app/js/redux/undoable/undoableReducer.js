import R from "ramda";

export default function undoable(reducer){

  const initialState = reducer();

  return function(state = initialState, action) {


    const reducerState = reducer(state, action);

    const newState = R.compose(
      R.map(R.when(v => !isHistoryItem(v), createHistoryItem))
    )(reducerState);

    return newState;
  };

}


function isHistoryItem(v){
  return R.has("past", v) && R.has("present", v) && R.has("future", v);
}


function createHistoryItem(value){
  return {
    past: [],
    present: value,
    future: []
  };
}
