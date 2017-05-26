import createLookupReducer from "../../redux/createLookupReducer.js";
import { DATASET, DATASET_UPDATE_FIELD } from "./datasetActions.js";

const initialState = {};


export default createLookupReducer({
  [DATASET_UPDATE_FIELD]: updateDatasetField
}, initialState);;



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
