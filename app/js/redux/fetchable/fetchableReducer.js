import { getActions } from "./fetchableActions.js";


/**
 * [fetchable description]
 * @param  {String} actionNamespace string to be prepended to actions. eg DATASET
 * @param  {Func}   reducer         Redux reducer to augment
 * @return {Func}                   a new redux reducer
 */
const fetchable = ({ actionNamespace, reducer }) => {

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
      // pass the json to the reducer so it can do with it what it wants
      data: reducer(json, action)
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


  const actions = getActions(actionNamespace);

  const reducerInitialState = reducer();

  const initialState = {
    error: null,
    isLoading: false,
    data: reducerInitialState
  };

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
