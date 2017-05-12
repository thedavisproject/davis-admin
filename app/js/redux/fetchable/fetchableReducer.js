import createLookupReducer from "../createLookupReducer.js";

const initialState = {
  error: undefined,
  isLoading: false,
  data: undefined
};


/**
 * [fetchable description]
 * @param  {String} actionKey [description]
 * @param  {[type]} reducer   [description]
 * @return {[type]}           [description]
 */
const fetchable = (actionKey, reducer) => {

  /**
   * Actions
   */

  function fetchRequest(state, action){
    return {
      ...state,
      isLoading: true
    };
  }

  function fetchSuccess(state, action){
    const { json } = action.payload;

    return {
      ...state,
      error: null,
      isLoading: false,
      data: json
    };
  }

  function fetchError(state, action){
    const { error } = action.payload;

    return {
      ...state,
      error: error,
      isLoading: false
    };
  }



  return function(state = initialState, action = {}){

    const lookup = {
      [`${actionKey}/FETCH_REQUEST`]: fetchRequest,
      [`${actionKey}/FETCH_SUCCESS`]: fetchSuccess,
      [`${actionKey}/FETCH_ERROR`]: fetchError
    };

    const fetchHandler = lookup[action.type];

    // if the action is one of the fetch actions, handle it here
    if (fetchHandler) {
      return fetchHandler(state, action);
    }

    // otherwise, forward the action to the reducer and merge it into the "data"
    else {
      return {
        ...state,
        data: reducer(state.data, action)
      };
    }
  };

};

export default fetchable;
