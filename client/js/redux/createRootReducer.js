import importReducer from "../components/Import/redux/importReducer.js";

export default function createRootReducer(){

  const defaultState = {};

  return function rootReducer(state = defaultState, action){
    return {
      import: importReducer(state.import, action)
    };
  };
}
