import R from "ramda";
import { navigateTo, redirectTo } from "./routingActions.js";


// use "/" or "/#/" or "/?/" here if you want
const URL_BASE = "/";



/* pages */
export const pages = {
  "": { },
  "datasets": { },
  "dataset": { hasId: true },
  "variables": { },
  "variable": { hasId: true }
};



/* helper functions */
const escapeForwardSlash = (v) =>
  (typeof v === "string") ? v.replace("/", "&#47;") : v;

const unescapeForwardSlash = (v) =>
  (typeof v === "string") ? v.replace("&#47;", "/") : v;

// String -> Boolean
const isBadToken = R.anyPass([
  R.equals("?"),
  R.equals("#"),
  R.equals(""),
  R.isNil
]);


/**
 * page: a key in pages defined above, defaults to homepage
 * id: optional, will omit /id/ for pages that "hasId"
 * @param  {Object} route key/value of args + special keys page and id
 * @return {String} the pathname of a url
 */
export function routeToUrl(route = {}){

  const { page = "", id = "", ...otherArgs } = route;

  // if the id is defined, either add /id/2 or just /2
  const maybeAddId = R.when(
    () => (id !== ""),
    R.prepend((pages[page].hasId) ? id : ["id", id])
  );

  const urlParts = R.compose(
    R.map(escapeForwardSlash),
    R.reject(isBadToken),
    R.prepend(page),     // make sure the page is first
    R.flatten,           // ->  ["sort", "asc", "filter", 22]
    maybeAddId,          // maybe add the id to the beginning
    R.toPairs            // ->  [["sort", "asc"], ["filter", 22]]
  )(otherArgs);          // eg. { sort: "asc", filter: 22 }

  // const urlParts = R.compose(
  //   R.map(escapeForwardSlash),
  //   R.reject(isBadToken),
  //   R.concat(R.__, argsArray), // << put argsArray at end
  //   R.append(page)
  // )([]);

  return URL_BASE + urlParts.join("/");
}



/**
 * @param  {Object} location window.location object
 * @return {Object} route object, should always have page key, sometimes id
 */
export function locationToRoute(location) {

  // eg. /dataset/1/filter/22/sort/asc
  const path = location.href.replace(location.origin, "");

  // get the page out of the url (first token)
  // eg /dataset/1/filter/22 > page = "dataset", tokens = ["1", "filter", "22"]
  const [page = "", ...tokens] = R.compose(
    R.map(unescapeForwardSlash),
    R.reject(isBadToken),
    R.split("/")
  )(path);


  // some craziness to figure out where the "pairs" start
  // ie. whether or not the first token is the id
  const [id, argsArray] = (pages[page] && pages[page].hasId)
    ? [tokens[0], R.drop(1, tokens)]
    : ["", tokens];

  // if a number can be parsed, return that number instead of the string
  // eg, "filter" -> "filter", "22" -> 22
  const maybeConvertToInt = v => (Number(v) === parseInt(v, 10)) ? Number(v) : v;

  // use "" as default if this pair doesn't have a buddy
  // eg. ["sort"] -> ["sort", ""], ["sort", "asc"] is untouched
  const fillInPair = pair => (pair.length === 1) ? pair.concat("") : pair;

  // pull out the args string key/values into an object
  // eg /filter/22/sort/asc -> { filter: 22, sort: "asc"}
  const args = R.compose(
    R.map(maybeConvertToInt),
    R.fromPairs,
    R.map(fillInPair),
    R.splitEvery(2)
  )(argsArray);


  const route = { page, id, ...args };

  // return the route, but don't include the id if it's empty
  return (id === "")
    ? R.omit("id", route)
    : route;
}


/**
 * state > url path
 * fired when a user navigates
 * @param  {Object} state : redux state
 * @return {String} url to pushState
 */
export function mapStateToPath(state) {

  if (!state || !state.route) { return URL_BASE; }

  return routeToUrl(state.route);
}


/**
 * url location > state
 * fired on page load or when the url changes by browser back/forward buttons
 * NOT when a user navigates with navigateTo or pushState
 * @param  {Object} location : window.location object
 * @param  {Object} store    : redux store
 * @param  {Object} [event]  : popstate event
 * @return {Object} a redux action
 */
export function handleUrlChange(location, store, event) {

  const route = locationToRoute(location);

  // if this page was not found, redirect to the homepage using replaceState
  if (!pages[route.page]) {
    return redirectTo({page: ""});
  }
  else {
    // otherwise
    return navigateTo(route);
  }

}
