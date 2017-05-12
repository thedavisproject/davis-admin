import createLookupReducer from "../createLookupReducer.js";
import fetchable from "../fetchable/fetchableReducer.js";
import { DATASET, DATASET_UPDATE_FIELD } from "./datasetActions.js";

const initialState = {};


const datasetReducer = createLookupReducer({
  [DATASET_UPDATE_FIELD]: updateDatasetField
}, initialState);


export default fetchable({
  actionKey: DATASET,
  reducer: datasetReducer
});



/**
 * Actions
 */

function updateDatasetField(state, action){
  const { key, value } = action.payload;

  return {
    ...state,
    [key]: value
  };
}
