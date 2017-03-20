export const DATASET_FETCH = "DATASET/FETCH";
export const DATASET_FETCH_SUCCESS = "DATASET/FETCH_SUCCESS";
export const DATASET_FETCH_ERROR   = "DATASET/FETCH_ERROR";

export function fetchDataset(datasetId) {
  return (dispatch, getState) => {

    // let the store know we're fetching
    dispatch({
      type: DATASET_FETCH,
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
    fetch(`/api/dataset/${datasetId}`)
      .then(handleNetworkErrors)
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: DATASET_FETCH_SUCCESS,
          payload: {
            item: json
          }
        });
      })
      .catch(error => {

        // TODO is this be the best way to handle errors??
        setTimeout(() => { throw error; }, 0);

        dispatch({
          type: DATASET_FETCH_ERROR,
          payload: {
            error: error.toString()
          }
        });
      });
  };

}
