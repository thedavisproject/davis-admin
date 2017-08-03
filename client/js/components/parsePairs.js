import R from "ramda";

/**
 * @param  {String} string url string. eg. /sort/asc
 * @return {Object} eg. { sort: "asc" }
 */ 
const parsePairs = (string) => {

  if (!string) { return {}; }

  const pairs = R.compose(
    R.fromPairs,
    R.splitEvery(2),
    R.filter(s => s !== ""),
    R.split("/")
  )(string);

  return pairs;

};

export default parsePairs;
