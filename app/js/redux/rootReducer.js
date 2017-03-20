import routingReducer from "./routing/routing-reducer.js";
import datasetsReducer from "./datasets/datasets-reducer.js";
import datasetReducer from "./dataset/dataset-reducer.js";

const defaultState = {};

export default function rootReducer(state = defaultState, action){
  return {
    route: routingReducer(state.route, action),
    datasets: datasetsReducer(state.datasets, action),
    dataset: datasetReducer(state.dataset, action)
  };
}
