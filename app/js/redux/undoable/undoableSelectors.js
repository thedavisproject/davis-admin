import R from "ramda";

export function getPresent(state){
  return R.map(
    R.when(isHistoryItem, R.prop("present"))
  )(state);
}


export function isHistoryItem(v){
  if (!v) { return false; }
  return R.has("past", v) && R.has("present", v) && R.has("future", v);
}
