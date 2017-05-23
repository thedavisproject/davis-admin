import R from "ramda";
import { connect } from "react-redux";

import DatasetList from "../components/Dataset/DatasetList.jsx";
import Fetchable from "../components/Fetchable/Fetchable.jsx";


function mapStateToProps(state, ownProps) {

  return {
    datasets: state.datasets.data,
    errorLoading: !R.isNil(state.datasets.error),
    errorLoadingMessage: "There was an error loading the datasets!",
    hasData: !R.isNil(state.datasets.data),
    isLoading: state.datasets.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}



export default connect(mapStateToProps, mapDispatchToProps)(Fetchable(DatasetList));
