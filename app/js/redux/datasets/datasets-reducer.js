import createLookupReducer from "../createLookupReducer.js";
import { DATASETS_FETCH, DATASETS_FETCH_SUCCESS, DATASETS_FETCH_ERROR}
  from "./datasets-actions.js";

const initialState = {
  error: null,
  isLoading: false,
  items: []
};


export default createLookupReducer({
  [DATASETS_FETCH]: fetchDatasets,
  [DATASETS_FETCH_SUCCESS]: fetchDatasetsSuccess,
  [DATASETS_FETCH_ERROR]: fetchDatasetsError
}, initialState);



/**
 * Actions
 */

function fetchDatasets(state, action){
  return Object.assign({}, state, {
    isLoading: true
  });
}

function fetchDatasetsSuccess(state, action){
  const { items } = action.payload;
  return Object.assign({}, state, {
    error: null,
    isLoading: false,
    items
  });
}

function fetchDatasetsError(state, action){
  const { error } = action.payload;

  return Object.assign({}, state, {
    error: error,
    isLoading: false
  });
}
