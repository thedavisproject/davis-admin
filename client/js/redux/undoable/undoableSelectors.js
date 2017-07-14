import R from "ramda";

export function getPresent(state){
  return R.map(
    R.when(isHistoryItem, R.prop("present"))
  )(state);
}


export function isHistoryItem(value){

  if (!value) { return false; }

  const keys = ["past", "present", "future", "updated"];

  return R.all(
    R.has(R.__, value)
  )(keys);

}
