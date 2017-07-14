import { createFetchUrlAction } from "../fetchable/fetchableActions.js";

export const VARIABLES = "VARIABLES";


const fetchVariablesByUrl = createFetchUrlAction(VARIABLES);

export const fetchVariables = (variableId) => {
  return fetchVariablesByUrl("/api/variables");
};
