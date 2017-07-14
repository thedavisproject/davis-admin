import { fetchDatasets }  from "../datasets/datasetsActions.js";
import { fetchDataset }   from "../dataset/datasetActions.js";
import { fetchVariable }  from "../variable/variableActions.js";
import { fetchVariables } from "../variables/variablesActions.js";

export const NAVIGATE_TO = "ROUTING/NAVIGATE_TO";
export const REDIRECT_TO = "ROUTING/REDIRECT_TO";

export function navigateTo(route){

  return (dispatch, getState) => {

    dispatch({
      type: NAVIGATE_TO,
      meta: {
        replaceState: false // createRoutingMiddleware is aware of this
      },
      payload: route
    });


    const { page, id } = route;

    if (page === "dataset" && id !== ""){
      dispatch(fetchDataset(id));
    }
    else if (page === "datasets"){
      dispatch(fetchDatasets());
    }
    else if (page === "variable" && id !== ""){
      dispatch(fetchVariable(id));
    }
    else if (page === "variables"){
      dispatch(fetchVariables());
    }

  };
}

// redirect to a page without messing with the location history
export function redirectTo(route){
  return {
    type: REDIRECT_TO,
    meta: {
      replaceState: true // createRoutingMiddleware is aware of this
    },
    payload: route
  };
}
