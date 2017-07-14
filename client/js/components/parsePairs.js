import R from "ramda";


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
