export const VARIABLES_FETCH = "VARIABLES/FETCH";
export const VARIABLES_FETCH_SUCCESS = "VARIABLES/FETCH_SUCCESS";
export const VARIABLES_FETCH_ERROR   = "VARIABLES/FETCH_ERROR";

export function fetchVariables() {
  return (dispatch, getState) => {

    // let the store know we're fetching
    dispatch({
      type: VARIABLES_FETCH,
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
    fetch("/api/variables")
      .then(handleNetworkErrors)
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: VARIABLES_FETCH_SUCCESS,
          payload: {
            items: json
          }
        });
      })
      .catch(error => {

        // TODO is this be the best way to handle errors??
        setTimeout(() => { throw error; }, 0);

        dispatch({
          type: VARIABLES_FETCH_ERROR,
          payload: {
            error: error.toString()
          }
        });
      });
  };

}
