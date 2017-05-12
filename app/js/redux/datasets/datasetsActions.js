import { createFetchUrlAction } from "../fetchable/fetchableActions.js";

export const DATASETS = "DATASETS";


export const fetchDatasetByUrl = createFetchUrlAction(DATASETS);

export const fetchDatasets = () => {
  return fetchDatasetByUrl("/api/datasets");
};
