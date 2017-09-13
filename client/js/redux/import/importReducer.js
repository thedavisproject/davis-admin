import R from "ramda";
import {
  IMPORT_SET_DATASET_ID,
  IMPORT_UPLOAD_START,
  IMPORT_UPLOAD_SUCCESS
} from "./importActions.js";

const initialState = {
  datasetId: null, //32, // null, << for testing
  datasetName: null,
  fileId: null, // "dbc970db37cab33953d63a1da9761bfd", // null, << for testing
  fileUploading: false
};


export default function importReducer(state = initialState, action){

  switch(action.type){
    case IMPORT_SET_DATASET_ID:
      return setDatasetId(state, action);

    case IMPORT_UPLOAD_START:
      return uploadStart(state, action);

    case IMPORT_UPLOAD_SUCCESS:
      return uploadSuccess(state, action);

    default:
      return state;
  }
}



function setDatasetId(state, action){
  const { datasetId } = action.payload;

  return R.merge(state, { datasetId });
}


function uploadStart(state, action) {
  return R.merge(state, { fileUploading: true });
}


function uploadSuccess(state, action) {
  const { fileId } = action.payload;

  return R.merge(state, {
    fileId: fileId,
    fileUploading: false
  });

}
