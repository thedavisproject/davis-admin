import routingReducer from "./routing/routing-reducer.js";
import datasetsReducer from "./dataset/datasets-reducer.js";

const defaultState = {};

export default function rootReducer(state = defaultState, action){
  return {
    route: routingReducer(state.route, action),
    datasets: datasetsReducer(state.datasets, action)
  };
}
