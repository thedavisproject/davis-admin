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

    // TODO better error handling, use data.task?
    // EG. when there is a syntax error in the json
    // dispatch({
    //   type: DATASETS_FETCH_ERROR,
    //   payload: {
    //     error: response.statusText
    //   }
    // });

    // kick off fetch
    fetch("fakedata/datasets.json")
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: DATASETS_FETCH_SUCCESS,
          payload: {
            items: json
          }
        });
      });
  };

}
