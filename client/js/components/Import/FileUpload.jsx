import React from "react";
import R from "ramda";
import { func } from "prop-types";

const propTypes = {
  onUploadStart: func.isRequired,
  onUploadSuccess: func.isRequired,
  onUploadError: func.isRequired
};

const FileUpload = (props) => {

  return (
    <input type="file" onChange={handleFileUpload(props)} />
  );
};


const handleFileUpload = R.curry(({ onUploadStart, onUploadSuccess, onUploadError }, e) => {

  // create the form data
  const formData = new FormData();

  // add the file to the form data object
  const file = R.path(["target", "files", 0], e);
  formData.append("", file);

  onUploadStart(file);

  fetch("http://api.davis.velir.com/upload", { // Your POST endpoint
    method: "POST",
    body: formData
  })
  .then( response => response.json() )
  .then( success => onUploadSuccess(success) )
  .catch( error => onUploadError(error) );

});


FileUpload.propTypes = propTypes;

export default FileUpload;
