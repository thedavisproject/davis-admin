import R from "ramda";
import { connect } from "react-redux";
import { fetchDatasets } from "../../redux/datasets/datasetsActions.js";

import Fetchable from "../Fetchable/Fetchable.jsx";
import DatasetList from "./DatasetList.jsx";


function mapStateToProps(state, ownProps) {

  return {
    datasets: state.datasets.data,
    errorLoading: !R.isNil(state.datasets.error),
    errorLoadingMessage: "There was an error loading the datasets!",
    hasData: !R.isNil(state.datasets.data),
    isLoading: state.datasets.isLoading
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAction: () => {
      dispatch(fetchDatasets());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Fetchable(DatasetList));
