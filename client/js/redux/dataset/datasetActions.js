import { createFetchUrlAction } from "../fetchable/fetchableActions.js";

export const DATASET = "DATASET";
export const DATASET_UPDATE_FIELD = `${DATASET}/UPDATE_FIELD`;


const fetchDatasetByUrl = createFetchUrlAction(DATASET);

export function fetchDataset(datasetId) {
  return fetchDatasetByUrl(`/api/dataset/${datasetId}`);
}


export function updateDatasetField(key, value){
  return {
    type: DATASET_UPDATE_FIELD,
    payload: { key, value }
  };
}
