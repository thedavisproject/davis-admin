import createLookupReducer from "../createLookupReducer.js";
import fetchable from "../fetchable/fetchableReducer.js";
import { DATASETS } from "./datasetsActions.js";

const initialState = [];


const datasetsReducer = createLookupReducer({

}, initialState);


export default fetchable({
  actionKey: DATASETS,
  reducer: datasetsReducer
});



/**
 * Actions
 */
