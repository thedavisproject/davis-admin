// http://redux.js.org/docs/advanced/Middleware.html

/**
 * mapStateToPath: User provided function to get the URL parameters out of the redux state.
 *                 The middleware will use this to update the URL when the redux state changes.
 * @callback mapStateToPath
 * @param  {Object} state: the current redux state
 * @return {String} a URL
 */

 /**
  * handleUrlChange: User provided function to handle updating the state when the url changes
  * @callback handleUrlChange
  * @param  {Object} location : the current window.location object
  * @param  {Object} store    : the current redux store.  Use store.getState()
  * @param  {Object} event    : the popstate event
  * @return {Object} A redux action, will be passed to store.dispatch()
  */

/**
 * createRoutingMiddleware: creates a middleware function to be passed to applyMiddleware
 *                          and attaches a window popstate listener
 * @param  {Function} mapStateToPath  : callback function, see above
 * @param  {Function} handleUrlChange : callback function, see above
 * @param  {Boolean}  handleLoad      : if true, it will call handleUrlChange when the page loads
 * @return {Function} redux middleware
 */
export default function createRoutingMiddleware({mapStateToPath, handleUrlChange, handleLoad = true}) {

  // return the middlware
  // "next" is the next dispatch function
  return store => next => {

    // our augmented dispatch function
    const dispatch = action => {

      // result is the action itself, this will also update the state
      // http://redux.js.org/docs/api/Store.html#dispatch
      const result = next(action);

      // execute the user function to get the url out of the newly updated redux state
      const url = mapStateToPath(store.getState(), window.location);

      // just the part after the origin, eg "/some-path/#/some-hash"
      const {  pathname, search, hash } = window.location;
      const currentPath = pathname + search + hash;

      // TODO:  this only compares the part after the origin, what if mapStateToPath returns a full url
      // then it will pushState even if the urls are the same

      // see routing-actions.js meta is a special key for things related to middleware
      // http://redux.js.org/docs/advanced/Middleware.html#seven-examples
      if (action.meta.replaceState){
        history.replaceState(null, null, url);
      }
      // if the url is different, pushState the new url
      else if (url !== currentPath) {
        history.pushState(null, null, url);
      }

      return result;
    };


    // function to run the user-provided handleUrlChange
    const executeUrlChange = (event) => {

      // call user function to handle the url change.  This function will return a redux action
      const action = handleUrlChange(window.location, store, event);

      // use our new dispatch funciton, so the url will reflect the new state
      // eg. if handleUrlChange redirects
      dispatch(action);
    };


    // execute handleUrlChange on load if specified
    if (handleLoad) { executeUrlChange(undefined, true); }

    // when the url changes...
    window.addEventListener("popstate", (event) => {
      event.preventDefault();
      executeUrlChange(event);
    });


    // return the new dispatch function
    return dispatch;
  };
}
