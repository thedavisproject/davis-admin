import createLookupReducer from "../createLookupReducer.js";
import { NAVIGATE_TO, REDIRECT_TO } from "./routingActions.js";

const initialState = {
  page: "" // eg "dataset"
  // ... other arguments, including id here
};


export default createLookupReducer({
  [NAVIGATE_TO]: navigateTo,
  [REDIRECT_TO]: navigateTo
}, initialState);


/**
 * Actions
 */

function navigateTo(state, action){
  return action.payload;
}
