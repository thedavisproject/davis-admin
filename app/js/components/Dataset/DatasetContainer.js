import R from "ramda";
import { connect } from "react-redux";

import Dataset from "./Dataset.jsx";

import { DATASET, updateDatasetField } from "../../redux/dataset/datasetActions.js";


function mapStateToProps(state, ownProps) {

  return ownProps;
}

function mapDispatchToProps(dispatch) {
  return {
    onFieldChange: (key, value) => {
      dispatch(updateDatasetField(key, value));
    },
    // onUndoClick: (key) => {
    //   dispatch(undo(DATASET, key));
    // },
    // onRedoClick: (key) => {
    //   dispatch(redo(DATASET, key));
    // },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Dataset);
