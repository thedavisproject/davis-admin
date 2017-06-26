import R from "ramda";
import { connect } from "react-redux";

import Dataset from "./Dataset.jsx";
import Fetchable from "../Fetchable/Fetchable.jsx";

import { DATASET, fetchDataset, updateDatasetField } from "../../redux/dataset/datasetActions.js";
import { undo, redo } from "../../redux/undoable/undoableActions.js";


function mapStateToProps(state, ownProps) {
  return {
    dataset: state.dataset.data,
    errorLoading: !R.isNil(state.dataset.error),
    errorLoadingMessage: "There was an error loading the dataset!",
    hasData: !R.isNil(state.dataset.data) && R.keys(state.dataset.data).length > 0,
    isLoading: state.dataset.isLoading
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchAction: () => {
      dispatch(fetchDataset(ownProps.id));
    },
    onFieldChange: (key, value) => {
      dispatch(updateDatasetField(key, value));
    },
    onUndoClick: (key) => {
      dispatch(undo(DATASET, key));
    },
    onRedoClick: (key) => {
      dispatch(redo(DATASET, key));
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Fetchable(Dataset));
