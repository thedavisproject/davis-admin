import { NAVIGATE_TO, REDIRECT_TO } from "./routing-actions.js";

const initialState = {
  page: "", // eg "dataset"
  id: "", // eg "1"
  params: {}
};

// a lookup of all the actions for routingReducer to use
const lookup = {
  [NAVIGATE_TO]: navigateTo,
  [REDIRECT_TO]: navigateTo
};

// when an action comes in, check the lookup for a handler
// and execute if it's there, otherwise, return the current state.
export default function routingReducer(state = initialState, action){
  const handler = lookup[action.type];
  return (handler) ? handler(state, action.payload) : state;
}


/**
 * Actions
 */

function navigateTo(state, { page = "", id = "", params = {} }){
  return { page, id, params };
}
