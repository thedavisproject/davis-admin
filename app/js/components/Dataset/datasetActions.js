export const DATASET = "DATASET";
export const DATASET_UPDATE_FIELD = `${DATASET}/UPDATE_FIELD`;


export function updateDatasetField(key, value){
  return {
    type: DATASET_UPDATE_FIELD,
    payload: { key, value }
  };
}
