import { getActions } from "./fetchableActions.js";

const initialState = {
  error: null,
  isLoading: false,
  data: null
};


/**
 * [fetchable description]
 * @param  {String} actionKey [description]
 * @param  {[type]} reducer   [description]
 * @return {[type]}           [description]
 */
const fetchable = ({ actionKey, reducer, onSuccess = (json) => json }) => {

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
      data: onSuccess(json)
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


  const actions = getActions(actionKey);

  return function(state = initialState, action = {}){

    const lookup = {
      [actions.request]: fetchRequest,
      [actions.success]: fetchSuccess,
      [actions.error]: fetchError
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
