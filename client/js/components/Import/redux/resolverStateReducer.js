import {
  initResolver, selectMethod, clearMethod,
  updateChooseQuery, selectChooseVariable
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

    default:
      return state;
  }
}
