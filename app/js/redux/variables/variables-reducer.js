import createLookupReducer from "../createLookupReducer.js";
import { VARIABLES_FETCH, VARIABLES_FETCH_SUCCESS, VARIABLES_FETCH_ERROR}
  from "./variables-actions.js";

const initialState = {
  error: null,
  isLoading: false,
  items: []
};

// a lookup of all the actions for the reducer to use
const lookup = {
  [VARIABLES_FETCH]: fetchVariabless,
  [VARIABLES_FETCH_SUCCESS]: fetchVariablessSuccess,
  [VARIABLES_FETCH_ERROR]: fetchVariablessError
};

export default createLookupReducer(lookup, initialState);



/**
 * Actions
 */

function fetchVariabless(state, action){
  return Object.assign({}, state, {
    isLoading: true
  });
}

function fetchVariablessSuccess(state, action){
  const { items } = action.payload;
  return Object.assign({}, state, {
    error: null,
    isLoading: false,
    items
  });
}

function fetchVariablessError(state, action){
  const { error } = action.payload;

  return Object.assign({}, state, {
    error: error,
    isLoading: false
  });
}
