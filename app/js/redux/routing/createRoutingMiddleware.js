// http://redux.js.org/docs/advanced/Middleware.html

const URL_INIT = "ROUTING/URL_INIT";


/**
 * mapStateToPath: User provided function to get the URL parameters out of the redux state.
 *                 The middleware will use this to update the URL when the redux state changes.
 * @callback mapStateToPath
 * @param  {Object} state: the current redux state
 * @return {string} a URL
 */

 /**
  * hangleUrlChange: User provided function to handle updating the state when the url changes
  * @callback hangleUrlChange
  * @param  {Object} urlParams: the current url params
  * @param  {Object} store    : the current redux store.  Use store.getState() and store.dispatch
  * @param  {Object} event    : the popstate event
  * @return {Promise|Any} Return a promise if something in handleUrlChange is disptached async.
  *                       Otherwise, it doesn't matter
  */

/**
 * createRoutingMiddleware: creates a middleware function to be passed to applyMiddleware
 *                          and attaches a window popstate listener
 * @param  {Function} mapStateToPath  : callback function, see above
 * @param  {Function} handleUrlChange : callback function, see above
 * @param  {Boolean}  handleLoad      : if true, it will call handleUrlChange when the page loads
 * @param  {Boolean}  useHash         : if true, it will add /#/ to all routes
 * @return {Function} redux middleware
 */
export default function createRoutingMiddleware({mapStateToPath, handleUrlChange, handleLoad = true}) {

  // return the middlware
  // "next" is the next dispatch function
  return store => next => {

    // flags are a code smell, but maybe this is ok in the situation.
    // use replaceState instead of pushState if this dispatch came from the popstate
    let shouldReplace = false;

    // function to run the user-provided handleUrlChange
    const executeUrlChange = (event) => {

      // set the flag that lets the dispatch function know that it should use replaceState
      shouldReplace = true;

      // call user function to handle the url change.  This function will probably call store.dispatch
      const change = handleUrlChange(window.location, store, event);

      // if handleUrlChange returns a promise, revert the flag only after it's done
      if (change && typeof(change.then) === "function"){
        change.then(() => { shouldReplace = false; });
      }
      // otherwise, revert it after handleUrlChange is done
      else {
        shouldReplace = false;
      }
    };


    // execute handleUrlChange on load if specified
    if (handleLoad) { executeUrlChange(); }

    // when the url changes...
    window.addEventListener("popstate", (event) => {
      event.preventDefault();
      executeUrlChange(event);
    });


    // our augmented dispatch function
    const dispatch = action => {

      // result is the action itself, this will also update the state
      // http://redux.js.org/docs/api/Store.html#dispatch
      const result = next(action);

      // execute the user function to get the url params out of the newly updated redux state
      const url = mapStateToPath(store.getState(), window.location);

      // just the part after the origin, eg "/some-path/#/some-hash"
      const {  pathname, search, hash } = window.location;
      const currentPath = pathname + search + hash;

      // TODO:  this only compares the part after the origin, what if mapStateToPath returns a full url?
      // then it will pushState even if the urls are the same

      // if the url is different, pushState/replaceState the new url
      if (url !== currentPath) {

        // if we're initializing the url params, replace the url state instead of push
        // eg. /profile?loc=27 > /profile?loc=27&breakdown=...
        // when the browser navigates "back", we don't want to go back to just /profile?loc=27
        // we want all the breakdown=... stuff
        if (action.type === URL_INIT || shouldReplace === true){
          history.replaceState(null, null, url);
        }
        else {
          history.pushState(null, null, url);
        }
      }

      return result;
    };

    // dispatch immediately to populate the url params
    // (this only happens when createRoutingMiddleware is called)
    dispatch({ type: URL_INIT });

    // return the new dispatch function
    return dispatch;
  };
}
