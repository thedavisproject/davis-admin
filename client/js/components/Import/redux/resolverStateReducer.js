import {
  initResolver, selectMethod, clearMethod,
  updateChooseQuery, selectChooseVariable,
  updateNewName, updateNewType, submitNewVariable
} from "./resolverState.js";

import {
  RESOLVE_INIT,
  RESOLVE_SELECT_METHOD,
  RESOLVE_CLEAR_METHOD
} from "./resolverStateActions.js";

import {
  RESOLVE_CHOOSE_QUERY_UPDATE,
  RESOLVE_CHOOSE_SELECT_VARIABLE
} from "./chooseActions.js";

import {
  RESOLVE_NEW_UPDATE_NAME,
  RESOLVE_NEW_UPDATE_TYPE,
  RESOLVE_NEW_SUBMIT
} from "./newActions.js";

// lookup of column header as the key
const initialState = {};



export default function resolverReducer(state = initialState, action){

  switch(action.type){

    case RESOLVE_INIT: {
      const { results } = action.payload;
      return initResolver(results, state);
    }

    case RESOLVE_SELECT_METHOD: {
      const { key, method } = action.payload;
      return selectMethod(key, method, state);
    }

    case RESOLVE_CLEAR_METHOD: {
      const { key } = action.payload;
      return clearMethod(key, state);
    }

    case RESOLVE_CHOOSE_QUERY_UPDATE: {
      const { key, query } = action.payload;
      return updateChooseQuery(key, query, state);
    }

    case RESOLVE_CHOOSE_SELECT_VARIABLE: {
      const { key, variable } = action.payload;
      return selectChooseVariable(key, variable, state);
    }

    case RESOLVE_NEW_UPDATE_NAME: {
      const { key, name } = action.payload;
      return updateNewName(key, name, state);
    }

    case RESOLVE_NEW_SUBMIT: {
      const { key } = action.payload;
      return submitNewVariable(key, state);
    }

    case RESOLVE_NEW_UPDATE_TYPE: {
      const { key, type } = action.payload;
      return updateNewType(key, type, state);
    }

    default:
      return state;
  }
}
