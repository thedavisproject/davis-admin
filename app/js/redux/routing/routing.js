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

  // get the page and id out of the url
  // eg ?/dataset/1 > ["dataset", "1"]
  const stripped = location.search
    .replace(/^(\/)?(\?)?(\/)?/, "");

  const [page = "", id = "", ...paramsArray] = stripped
    .split("/");

  // pull out the params string key/values into an object
  // eg /filter/22/sort/asc -> { filter: 22, sort: "asc"}
  const params = R.compose(
    R.fromPairs,
    R.splitEvery(2)
  )(paramsArray);


  store.dispatch(navigateTo(page, id, params));

}
