import { createFetchUrlAction } from "../fetchable/fetchableActions.js";

export const VARIABLE = "VARIABLE";


const fetchVariableByUrl = createFetchUrlAction(VARIABLE);

export const fetchVariable = (variableId) => {
  return fetchVariableByUrl(`/api/variable/${variableId}`);
};
