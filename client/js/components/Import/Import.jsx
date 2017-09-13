import React from "react";
import { bool, func, number, string } from "prop-types";
import R from "ramda";


import FileUpload from "./FileUpload.jsx";
import ResolverContainer from "./Resolver/ResolverContainer.js";
import TextInput from "../TextInput/TextInput.jsx";


const propTypes = {
  fileId: string,
  fileUploading: bool,
  datasetId: number,
  datasetName: string,
  onDatasetSubmit: func.isRequired,
  onDatasetSubmitSuccess: func.isRequired,
  // onDatasetSubmitError: func.isRequired,
  onUploadStart: func.isRequired,
  onUploadSuccess: func.isRequired,
  // onUploadError: func.isRequired,
};

const Import = (props) => {


  const handleUploadStart = (file) => {
    props.onUploadStart(file);
  };

  const handleUploadSuccess = (response) => {
    const { id } = response; // fileId

    props.onUploadSuccess(id);
  };

  const handleUploadError = (error) => {
    console.error(error);
    // props.onUploadError(error);
  };

  const handleDatasetNameChange = (datasetName) => {
    // maybe validation in the future?
  };

  const handleDatasetNameSubmit = (e) => {
    e.preventDefault();
    const { onDatasetSubmit, onDatasetSubmitSuccess } = props;
    const datasetName = e.target.name.value;

    onDatasetSubmit(datasetName)
      .then(response => {
        const id = R.path(["entities", "create", 0, "id"], response);
        onDatasetSubmitSuccess(id);
      });
      // .catch(error => {
      //   console.log("roar!", error);
      // });
  };

  const getStep = () => {
    const { fileId, datasetId } = props;

    if (R.isNil(fileId)){
      return 1;
    }

    if (R.isNil(datasetId)){
      return 2;
    }

    return 3;
  };

  const renderStep = () => {

    const { fileUploading, datasetId, fileId } = props;

    switch(getStep()){
      case 1:
        return (
          <div>
            <h2>Upload a file</h2>
            <FileUpload
              onUploadStart   = {handleUploadStart}
              onUploadSuccess = {handleUploadSuccess}
              onUploadError   = {handleUploadError}
            />
            {fileUploading && "uploading..."}
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Dataset Name</h2>
            <form onSubmit={handleDatasetNameSubmit}>
              <TextInput name="name" onChange={handleDatasetNameChange} />
              <button type="submit">Submit</button>
            </form>
          </div>
        );
      case 3:
        return (
          <ResolverContainer datasetId={datasetId} fileId={fileId} />
        );
      default:
        return (
          <div>Uhh ohhhhhhh</div>
        );
    }
  };


  return (
    <div>
      {renderStep()}
    </div>
  );

};


Import.propTypes = propTypes;

export default Import;
