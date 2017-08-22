import React from "react";

import Upload from "./Upload.jsx";


export default class Import extends React.Component {

  state = {
    datasetId: null,
    uploading: false
  }

  handleUploadStart = (file) => {
    this.setState({ uploading: true });
  }

  handleUploadSuccess = (response) => {
    const { id } = response;

    this.setState({
      datasetId: id,
      uploading: false
    });
  }

  handleUploadError = (error) => {
    console.error(error);
  }

  getStep = () => {
    const { datasetId } = this.state;

    if (datasetId === null){
      return 1;
    }
    return 2;

  }

  renderStep = () => {

    switch(this.getStep()){
      case 1:
        return (
          <Upload
            onUploadStart   = {this.handleUploadStart}
            onUploadSuccess = {this.handleUploadSuccess}
            onUploadError   = {this.handleUploadError}
          />
        );
      default:
        return <div>uploaded!</div>;
    }
  }

  render = () => {
    return (
      <div>
        {this.renderStep()}
        {this.state.uploading && <div>uploading...</div>}
      </div>
    );
  }

}
