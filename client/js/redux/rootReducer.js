import datasetReducer   from "./dataset/datasetReducer.js";
import datasetsReducer  from "./datasets/datasetsReducer.js";


const defaultState = {};

export default function rootReducer(state = defaultState, action){
  return {
    dataset: datasetReducer(state.dataset, action),
    datasets: datasetsReducer(state.datasets, action)
  };
}
