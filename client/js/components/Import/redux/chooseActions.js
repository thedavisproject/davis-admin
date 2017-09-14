export const RESOLVE_CHOOSE_QUERY_UPDATE = "RESOLVE/CHOOSE/QUERY_UPDATE";
export const RESOLVE_CHOOSE_SELECT_VARIABLE = "RESOLVE/CHOOSE/SELECT_VARIABLE";


export function updateQuery(key, query){
  return {
    type: RESOLVE_CHOOSE_QUERY_UPDATE,
    payload: { key, query }
  };
}


export function selectVariable(key, variable){
  return {
    type: RESOLVE_CHOOSE_SELECT_VARIABLE,
    payload: { key, variable }
  };
}
