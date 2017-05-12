import R from "ramda";
import { connect } from "react-redux";

import Dataset from "../components/Dataset/Dataset.jsx";
import Promised from "../components/Promised/Promised.jsx";

import { updateDatasetField } from "../redux/dataset/datasetActions.js";


function mapStateToProps(state, ownProps) {

  const routeArgs = R.omit(["page", "id"], state.route);

  return {
    dataset: state.dataset.data,
    errorLoading: !R.isNil(state.dataset.error),
    errorLoadingMessage: "There was an error loading the dataset!",
    hasData: !R.isNil(state.dataset.data),
    isLoading: state.dataset.isLoading,
    ...routeArgs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onFieldChange: (key, value) => {
      dispatch(updateDatasetField(key, value));
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Promised(Dataset));
