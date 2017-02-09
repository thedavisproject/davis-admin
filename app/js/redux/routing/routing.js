import { navigateTo } from "./routing-actions.js";
import R from "ramda";

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

// state > url path
// fired when a user navigates
export function mapStateToPath(state) {

  // use "/" or "/#/" or "/?/" here if you want
  const base = "/";

  if (!state || !state.route) { return base; }

  const { page, id, params } = state.route;

  const paramsArray = R.compose(
    R.flatten,     // ->  ["sort", "asc", "filter", 22]
    R.toPairs      // ->  [["sort", "asc"], ["filter", 22]]
  )(params);       // eg. { sort: "asc", filter: 22 }

  const urlParts = R.compose(
    R.map(escapeForwardSlash),
    R.reject(isBadToken),
    R.concat(R.__, paramsArray), // << put at end
    R.append(id),
    R.append(page)
  )([]);

  return base + urlParts.join("/");
}


// url path > state
// fired when the url changes by browser back/forward buttons
export function handleUrlChange(location, store) {

  // eg. /dataset/1/filter/22/sort/asc
  const path = location.href.replace(location.origin, "");

  // get the page and id out of the url (first 2 tokens)
  // eg /dataset/1 > ["dataset", "1"]
  const [page = "", id = "", ...paramsArray] = R.compose(
    R.map(unescapeForwardSlash),
    R.reject(isBadToken),
    R.split("/")
  )(path);

  // if a number can be parsed, return that number instead of the string
  // eg, "filter" -> "filter", "22" -> 22
  const maybeParseInt = v => parseInt(v) || v;

  // use "" as default if this pair doesn't have a buddy
  // eg. ["sort"] -> ["sort", ""], ["sort", "asc"] is untouched
  const fillInPair = pair => (pair.length === 1) ? pair.concat("") : pair;

  // pull out the params string key/values into an object
  // eg /filter/22/sort/asc -> { filter: 22, sort: "asc"}
  const params = R.compose(
    R.map(maybeParseInt),
    R.fromPairs,
    R.map(fillInPair),
    R.splitEvery(2)
  )(paramsArray);


  store.dispatch(navigateTo(page, id, params));
}
