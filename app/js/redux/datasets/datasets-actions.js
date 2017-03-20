export const DATASETS_FETCH = "DATASETS/FETCH";
export const DATASETS_FETCH_SUCCESS = "DATASETS/FETCH_SUCCESS";
export const DATASETS_FETCH_ERROR   = "DATASETS/FETCH_ERROR";

export function fetchDatasets() {
  return (dispatch, getState) => {

    // let the store know we're fetching
    dispatch({
      type: DATASETS_FETCH,
      payload: {}
    });


    // TODO is this the best way to handle errors??
    function handleNetworkErrors(response){
      if (response.status > 299){
        throw new Error(response.statusText);
      }
      else {
        return response;
      }
    }

    // kick off fetch
    fetch("/api/datasets")
      .then(handleNetworkErrors)
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: DATASETS_FETCH_SUCCESS,
          payload: {
            items: json
          }
        });
      })
      .catch(error => {

        // TODO is this be the best way to handle errors??
        setTimeout(() => { throw error; }, 0);

        dispatch({
          type: DATASETS_FETCH_ERROR,
          payload: {
            error: error.toString()
          }
        });
      });
  };

}
