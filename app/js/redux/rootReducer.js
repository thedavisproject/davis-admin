import routingReducer from "./routing/routing-reducer.js";

const defaultState = {};

export default function rootReducer(state = defaultState, action){
  return {
    route: routingReducer(state.route, action)
  };
}
