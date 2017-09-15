export const RESOLVE_NEW_UPDATE_NAME = "RESOLVE/NEW/UPDATE_NAME";
export const RESOLVE_NEW_SUBMIT = "RESOLVE/NEW/SUBMIT";



export function updateName(key, name){
  return {
    type: RESOLVE_NEW_UPDATE_NAME,
    payload: { key, name }
  };
}


export function submitNewVariable(key){
  return {
    type: RESOLVE_NEW_SUBMIT,
    payload: { key }
  };
}
