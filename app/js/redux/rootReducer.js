import datasetReducer   from "./dataset/datasetReducer.js";
import datasetsReducer  from "./datasets/datasetsReducer.js";
import routingReducer   from "./routing/routingReducer.js";
import variableReducer  from "./variable/variableReducer.js";
import variablesReducer from "./variables/variablesReducer.js";

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
