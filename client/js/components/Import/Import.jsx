import React from "react";
import { func } from "prop-types";
import R from "ramda";


import FileUpload from "./FileUpload.jsx";
import Resolver from "./Resolver/Resolver.jsx";
import TextInput from "../TextInput/TextInput.jsx";


export default class Import extends React.Component {

  static propTypes = {
    onDatasetSubmit: func.isRequired
  }

  state = {
    fileId: null,
    fileUploading: false,
    datasetId: null,
    datasetName: null,
  }

  handleUploadStart = (file) => {
    this.setState({ fileUploading: true });
  }

  handleUploadSuccess = (response) => {
    const { id } = response;

    this.setState({
      fileId: id,
      fileUploading: false
    });
  }

  handleUploadError = (error) => {
    console.error(error);
  }

  handleDatasetNameChange = (datasetName) => {
    this.setState({ datasetName });
  }

  handleDatasetNameSubmit = (e) => {
    e.preventDefault();
    const { onDatasetSubmit } = this.props;
    const { datasetName } = this.state;

    if (onDatasetSubmit){
      onDatasetSubmit(datasetName)
        .then(response => {
          const id = R.path(["entities", "create", 0, "id"], response)
          this.setState({ datasetId: id });
        })
        .catch(error => {
          console.log("roar!", error);
        });
    }
  }

  getStep = () => {
    const { fileId, datasetId } = this.state;

    if (fileId === null){
      return 1;
    }

    if (datasetId === null){
      return 2;
    }

    return 3;
  }

  renderStep = () => {

    const { fileUploading } = this.state;

    switch(this.getStep()){
      case 1:
        return (
          <div>
            <h2>Upload a file</h2>
            <FileUpload
              onUploadStart   = {this.handleUploadStart}
              onUploadSuccess = {this.handleUploadSuccess}
              onUploadError   = {this.handleUploadError}
            />
            {fileUploading && "uploading..."}
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Dataset Name</h2>
            <form onSubmit={this.handleDatasetNameSubmit}>
              <TextInput onChange={this.handleDatasetNameChange} />
              <button type="submit">Submit</button>
            </form>
          </div>
        );
      default:
        return (
          <div>
            wooo!
            <pre>{JSON.stringify(this.state, null, 2)}</pre>
          </div>
        );
    }
  }


  render = () => {
    return (
      <div>
        {this.getStep()}
        {this.renderStep()}
      </div>
    );
  }

}
