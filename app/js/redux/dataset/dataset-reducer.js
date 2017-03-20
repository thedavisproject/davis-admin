import createLookupReducer from "../createLookupReducer.js";
import { DATASET_FETCH, DATASET_FETCH_SUCCESS, DATASET_FETCH_ERROR}
  from "./dataset-actions.js";

const initialState = {
  error: null,
  isLoading: false,
  item: null
};

// a lookup of all the actions for the reducer to use
const lookup = {
  [DATASET_FETCH]: fetchDataset,
  [DATASET_FETCH_SUCCESS]: fetchDatasetSuccess,
  [DATASET_FETCH_ERROR]: fetchDatasetError
};

export default createLookupReducer(lookup, initialState);



/**
 * Actions
 */

function fetchDataset(state, action){
  return Object.assign({}, state, {
    isLoading: true
  });
}

function fetchDatasetSuccess(state, action){
  const { item } = action.payload;
  return Object.assign({}, state, {
    error: null,
    isLoading: false,
    item
  });
}

function fetchDatasetError(state, action){
  const { error } = action.payload;

  return Object.assign({}, state, {
    error: error,
    isLoading: false
  });
}
