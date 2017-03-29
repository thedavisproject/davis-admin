import R from "ramda";
import { navigateTo, redirectTo } from "./routing-actions.js";



/* pages */
export const pages = {
  "": { },
  "datasets": { },
  "dataset": { hasId: true },
  "variables": { },
  "variable": { hasId: true }
};

// use "/" or "/#/" or "/?/" here if you want
const URL_BASE = "/";


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
 * @param  {String} [page=""]  a key in pages defined above
 * @param  {String} [id=""]    optional, only valid for pages with hasId
 * @param  {Object} [args={}}] key:value additional args
 * @return {String}            the pathname of a url
 */
export function routeToUrl({page = "", id = "", args = {}}){

  const argsArray = R.compose(
    R.flatten,     // ->  ["sort", "asc", "filter", 22]
    R.toPairs      // ->  [["sort", "asc"], ["filter", 22]]
  )(args);       // eg. { sort: "asc", filter: 22 }

  const urlParts = R.compose(
    R.map(escapeForwardSlash),
    R.reject(isBadToken),
    R.concat(R.__, argsArray), // << put at end
    R.append(id),
    R.append(page)
  )([]);

  return URL_BASE + urlParts.join("/");
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
 * url path > state
 * fired on page load or when the url changes by browser back/forward buttons
 * @param  {Object} location : window.location object
 * @param  {Object} store    : redux store
 * @param  {Object} [event]  : popstate event
 * @return {Object} return a redux action
 */
export function handleUrlChange(location, store, event) {

  // eg. /dataset/1/filter/22/sort/asc
  const path = location.href.replace(location.origin, "");

  // get the page out of the url (first token)
  // eg /dataset/1/filter/22 > page = "dataset", tokens = ["1", "filter", "22"]
  const [page = "", ...tokens] = R.compose(
    R.map(unescapeForwardSlash),
    R.reject(isBadToken),
    R.split("/")
  )(path);

  // if this page was not found, redirect to the homepage using replaceState
  if (!pages[page]) {
    return redirectTo({page: ""});
  }


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


  return navigateTo({page, id, args});
}
