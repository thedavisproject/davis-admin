import { connect } from "react-redux";

import DatasetList from "../components/Dataset/DatasetList.jsx";
import Promised from "../components/Promised/Promised.jsx";


function mapStateToProps(state, ownProps) {

  return {
    datasets: state.datasets.data,
    errorLoading: (state.datasets.error !== null),
    errorLoadingMessage: "There was an error loading the datasets!",
    hasData: (state.datasets.data !== null),
    isLoading: state.datasets.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}



export default connect(mapStateToProps, mapDispatchToProps)(Promised(DatasetList));
