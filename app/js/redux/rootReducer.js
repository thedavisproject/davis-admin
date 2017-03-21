import datasetReducer   from "./dataset/dataset-reducer.js";
import datasetsReducer  from "./datasets/datasets-reducer.js";
import routingReducer   from "./routing/routing-reducer.js";
import variableReducer  from "./variable/variable-reducer.js";
import variablesReducer from "./variables/variables-reducer.js";

const defaultState = {};

export default function rootReducer(state = defaultState, action){
  return {
    dataset: datasetReducer(state.dataset, action),
    datasets: datasetsReducer(state.datasets, action),
    route: routingReducer(state.route, action),
    variable: variableReducer(state.variable, action),
    variables: variablesReducer(state.variables, action)
  };
}
