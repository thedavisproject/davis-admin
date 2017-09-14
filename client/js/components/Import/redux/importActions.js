export const IMPORT_SET_DATASET_ID = "IMPORT/SET_DATASET_ID";
export const IMPORT_UPLOAD_START = "IMPORT/UPLOAD_START";
export const IMPORT_UPLOAD_SUCCESS = "IMPORT/UPLOAD_SUCCESS";


export function setDatasetId(datasetId){
  return {
    type: IMPORT_SET_DATASET_ID,
    payload: { datasetId }
  };
}


export function uploadStart(){
  return {
    type: IMPORT_UPLOAD_START,
    payload: {}
  };
}


export function uploadSuccess(fileId){
  return {
    type: IMPORT_UPLOAD_SUCCESS,
    payload: { fileId }
  };
}
