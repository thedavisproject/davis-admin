import createLookupReducer from "../createLookupReducer.js";
import { NAVIGATE_TO, REDIRECT_TO } from "./routing-actions.js";

const initialState = {
  page: "" // eg "dataset"
  // ... other arguments, including id here
};

// a lookup of all the actions
const lookup = {
  [NAVIGATE_TO]: navigateTo,
  [REDIRECT_TO]: navigateTo
};

export default createLookupReducer(lookup, initialState);


/**
 * Actions
 */

function navigateTo(state, action){
  return action.payload;
}
