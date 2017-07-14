import createLookupReducer from "../createLookupReducer.js";
import fetchable from "../fetchable/fetchableReducer.js";
import { VARIABLE } from "./variableActions.js";

const initialState = [];


const datasetsReducer = createLookupReducer({

}, initialState);


export default fetchable({
  actionNamespace: VARIABLE,
  reducer: datasetsReducer
});



/**
 * Actions
 */
