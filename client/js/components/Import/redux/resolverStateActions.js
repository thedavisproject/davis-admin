export const RESOLVE_INIT = "RESOLVE/INIT";
export const RESOLVE_RESOLVE_WITH = "RESOLVE/RESOLVE_WITH";
export const RESOLVE_SELECT_METHOD = "RESOLVE/SELECT_METHOD";
export const RESOLVE_CLEAR_METHOD = "RESOLVE/CLEAR_METHOD";


export function resolveWith(key, resolution){
  return {
    type: RESOLVE_RESOLVE_WITH,
    payload: { key, resolution }
  };
}


export function initResolverState(results){
  return {
    type: RESOLVE_INIT,
    payload: { results }
  };
}


export function selectMethod(key, method){
  return {
    type: RESOLVE_SELECT_METHOD,
    payload: { key, method }
  };
}


export function clearMethod(key){
  return {
    type: RESOLVE_CLEAR_METHOD,
    payload: { key }
  };
}
