export const VARIABLE_FETCH = "VARIABLE/FETCH";
export const VARIABLE_FETCH_SUCCESS = "VARIABLE/FETCH_SUCCESS";
export const VARIABLE_FETCH_ERROR   = "VARIABLE/FETCH_ERROR";

export function fetchVariable(variableId) {
  return (dispatch, getState) => {

    // let the store know we're fetching
    dispatch({
      type: VARIABLE_FETCH,
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
    fetch(`/api/variable/${variableId}`)
      .then(handleNetworkErrors)
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: VARIABLE_FETCH_SUCCESS,
          payload: {
            item: json
          }
        });
      })
      .catch(error => {

        // TODO is this be the best way to handle errors??
        setTimeout(() => { throw error; }, 0);

        dispatch({
          type: VARIABLE_FETCH_ERROR,
          payload: {
            error: error.toString()
          }
        });
      });
  };

}
