import createLookupReducer from "../createLookupReducer.js";
import fetchable from "../fetchable/fetchableReducer.js";
import { VARIABLES } from "./variablesActions.js";

const initialState = [];


const datasetsReducer = createLookupReducer({

}, initialState);


export default fetchable({
  actionNamespace: VARIABLES,
  reducer: datasetsReducer
});



/**
 * Actions
 */
