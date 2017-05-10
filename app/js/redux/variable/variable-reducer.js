import createLookupReducer from "../createLookupReducer.js";
import { VARIABLE_FETCH, VARIABLE_FETCH_SUCCESS, VARIABLE_FETCH_ERROR}
  from "./variable-actions.js";

const initialState = {
  error: null,
  isLoading: false,
  item: null
};


export default createLookupReducer({
  [VARIABLE_FETCH]: fetchVariable,
  [VARIABLE_FETCH_SUCCESS]: fetchVariableSuccess,
  [VARIABLE_FETCH_ERROR]: fetchVariableError
}, initialState);



/**
 * Actions
 */

function fetchVariable(state, action){
  return Object.assign({}, state, {
    isLoading: true
  });
}

function fetchVariableSuccess(state, action){
  const { item } = action.payload;
  return Object.assign({}, state, {
    error: null,
    isLoading: false,
    item
  });
}

function fetchVariableError(state, action){
  const { error } = action.payload;

  return Object.assign({}, state, {
    error: error,
    isLoading: false
  });
}
