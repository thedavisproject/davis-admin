import datasetReducer   from "./dataset/datasetReducer.js";
import datasetsReducer  from "./datasets/datasetsReducer.js";


export default function createRootReducer(apolloReducer){

  const defaultState = {};

  return function rootReducer(state = defaultState, action){
    return {
      apollo: apolloReducer(state.apollo, action),
      datasets: datasetsReducer(state.datasets, action),
      dataset: datasetReducer(state.dataset, action)
    };
  };
}
