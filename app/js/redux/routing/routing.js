import { navigateTo } from "./routing-actions.js";
import R from "ramda";

// state > url path
// fired when a user navigates
export function mapStateToPath(state) {

  const { page, id, params } = state.route;

  const pageUrl = `/?/${page}`;
  const idUrl = (typeof(id) === "string" && id !== "") ? `/${id}` : "";

  // smash the params into a string separated by /
  // eg { filter: 22, sort: "asc"} -> /filter/22/sort/asc
  const paramsUrl = R.compose(
    R.join(""),
    R.values,
    R.mapObjIndexed((value, key) => `/${key}/${value}`)
  )(params);


  return pageUrl + idUrl + paramsUrl;
}

// url path > state
// fired when the url changes by browser back/forward buttons
export function handleUrlChange(location, store) {

  // get the page and id out of the url (first 2 tokens)
  // eg /?/dataset/1 > ["dataset", "1"]

  const [page = "", id = "", ...paramsArray] = R.compose(
    R.split("/"),
    R.replace(/^(\/)?(\?)?(\/)?/, "") // first, remove /?/ if there
  )(location.search); // location.search: eg /?/dataset/1/filter/22/sort/asc


  // pull out the params string key/values into an object
  // eg /filter/22/sort/asc -> { filter: 22, sort: "asc"}
  const params = R.compose(
    // if the value is a number, use that number instead of the string
    // eg, /filter/22 -> { filter: 22 } instead of { filter: "22" }
    R.map(v => parseInt(v) || v),
    R.fromPairs,
    // use "" as default if this pair doesn't have a value,
    // eg. /filter/22/sort << sort should have a value!
    R.map(pair => pair.length === 1 ? pair.concat("") : pair),
    R.splitEvery(2)
  )(paramsArray);


  store.dispatch(navigateTo(page, id, params));

}
