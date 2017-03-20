import { fetchDatasets } from "../datasets/datasets-actions.js";
import { fetchDataset } from "../dataset/dataset-actions.js";

export const NAVIGATE_TO = "ROUTING/NAVIGATE_TO";
export const REDIRECT_TO = "ROUTING/REDIRECT_TO";

export function navigateTo(page = "", id = "", args = {}){

  return (dispatch, getState) => {

    dispatch({
      type: NAVIGATE_TO,
      meta: {
        replaceState: false // createRoutingMiddleware is aware of this
      },
      payload: {
        page,
        id,
        args
      }
    });


    if (page === "dataset" && id !== ""){
      dispatch(fetchDataset(id));
    }
    else if (page === "datasets"){
      dispatch(fetchDatasets());
    }

  };
}

// redirect to a page without messing with the location history
export function redirectTo(page = "", id = "", args = {}){
  return {
    type: REDIRECT_TO,
    meta: {
      replaceState: true // createRoutingMiddleware is aware of this
    },
    payload: {
      page,
      id,
      args
    }
  };
}
