/**
 * Factory function to create a redux action to fetch a url.
 * example usage:
 *   const fetchDatasetByUrl = createFetchUrlAction(DATASET);
 *
 *    export const fetchDataset = (datasetId) => {
 *      return fetchDatasetByUrl(`/api/dataset/${datasetId}`);
 *    };
 *
 * @param  {String} actionNamespace Uppercase string to describe the redux module.
 *                  Usually a const, eg. DATASET
 * @return {Func}   A function expecting a url
 */
export const createFetchUrlAction = (actionNamespace) => (url) => {

  const actions = getActions(actionNamespace);


  return (dispatch, getState) => {

    // let the store know we're fetching
    dispatch({
      type: actions.request,
      payload: { url }
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
    return fetch(url)
      .then(handleNetworkErrors)
      .then(response => response.json())
      .then(
        json => {
          dispatch({
            type: actions.success,
            payload: {
              json: json
            }
          });
        },
        error => {
          // TODO is this be the best way to handle errors??
          setTimeout(() => { throw error; }, 0);

          dispatch({
            type: actions.error,
            payload: {
              error: error.toString()
            }
          });
        }
      );
  };
};


export function getActions(actionNamespace) {
  return {
    request: `${actionNamespace}/FETCH_REQUEST`,
    success: `${actionNamespace}/FETCH_SUCCESS`,
    error: `${actionNamespace}/FETCH_ERROR`
  };
}
