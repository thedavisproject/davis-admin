export default function createLookupReducer(lookup = {}, initialState){

  // when an action comes in, check the lookup for a handler
  // and execute if it's there, otherwise, return the current state.
  return function(state = initialState, action = {}){

    const handler = lookup[action.type];

    return (handler)
      ? handler(state, action)
      : state;
  };
}

/**
 * example:
 * const lookup = {
 *   [ACTION_ONE] : handleActionOne,
 *   [ACTION_TOW] : handleActionTwo
 * }
 *
 * const initialState = {};
 *
 * function handleActionOne(state, action) { ... }
 *
 * export default createLookupReducer(lookup, initialState);
 */
