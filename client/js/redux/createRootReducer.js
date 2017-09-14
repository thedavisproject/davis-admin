import importReducer from "../components/Import/redux/importReducer.js";

export default function createRootReducer(apolloReducer){

  const defaultState = {};

  return function rootReducer(state = defaultState, action){
    return {
      apollo: apolloReducer(state.apollo, action),
      import: importReducer(state.import, action)
    };
  };
}
