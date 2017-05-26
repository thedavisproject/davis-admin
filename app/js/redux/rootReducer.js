import datasetReducer   from "../components/Dataset/datasetReducer.js";
// import datasetsReducer  from "../components/DatasetList/datasetListReducer.js";


const defaultState = {};

export default function rootReducer(state = defaultState, action){
  return {
    dataset: datasetReducer(state.dataset, action)
    // datasets: datasetsReducer(state.datasets, action)
  };
}
