import R from "ramda";


/**
 * a data structure for a resolver state
 * an object with keys of the columns headers of a data sheet.
 * the values of of type resolver-item
 * @type {ResolverState}
 */

/**
 * see createResolverStateItem
 * @type {ResolverStateItem}
 */


/**
 * transforms an array of analyze results into a ResolverState object
 * @param  {Array} results of { attributes, key, match, variable }
 * @return {ResolverState} a Resolver state object
 */
export const initResolver = (results) => {
  return R.compose(
    R.indexBy(R.prop("key")),
    R.map(result => createResolverStateItem(result.key))
  )(results);
};


/**
 * creates a ResolverStateItem
 * @param  {String} key column header
 * @return {ResolverStateItem} object to be consumed by Resolver.jsx
 */
const createResolverStateItem = (key) => {
  return {
    key,
    selected: "", // "choose", "new", "ignore", or ""
    resolvedBy: null, // { type, display, data }
    choose: {
      query: key
    },
    new: {
      name: key
    }
  };
};


/**
 * resolve and clear selected
 * @param  {String} key Column header
 * @param  {Object} resolvedBy { type, display, data }
 * @param  {ResolverState} resolverState
 * @return {ResolverState} updated resolverState
 */
export const resolveWith = R.curry((key, resolvedBy, resolverState) => {

  const selectedLens   = R.lensPath([key, "selected"]);
  const resolvedByLens = R.lensPath([key, "resolvedBy"]);

  return R.compose(
    R.set(selectedLens, ""),
    R.set(resolvedByLens, resolvedBy)
  )(resolverState);

});


/**
 * [selectMethod description]
 * @param  {String} key      [description]
 * @param  {String} method   [description]
 * @param  {ResolverState} resolverState [description]
 * @return {ResolverState} updated resovler
 */
export const selectMethod = (key, method, resolverState) => {

  const selectedLens = R.lensPath([key, "selected"]);

  // immediately resolve when ignore is clicked
  if (method === "ignore"){
    const resolvedBy = {
      type: "ignore",
      display: "",
      data: null
    };

    return resolveWith(key, resolvedBy, resolverState);
  }
  // otherwise, change the selected method
  else {
    return R.set(selectedLens, method, resolverState);
  }
};


export const clearMethod = (key, resolverState) => {

  const resolvedByLens = R.lensPath([key, "resolvedBy"]);

  return R.set(resolvedByLens, null, resolverState);
};



export const updateChooseQuery = (key, query, resolverState) => {

  const queryLens = R.lensPath([key, "choose", "query"]);

  return R.set(queryLens, query, resolverState);
};


export const selectChooseVariable = (key, variable, resolverState) => {

  const queryLens = R.lensPath([key, "choose", "query"]);

  const resolvedBy = {
    type: "choose",
    display: variable.name,
    data: variable
  };

  return R.compose(
    R.set(queryLens, variable.name),
    resolveWith(key, resolvedBy)
  )(resolverState);

};
