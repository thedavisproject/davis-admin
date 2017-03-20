import { connect } from "react-redux";

import { navigateTo } from "../redux/routing/routing-actions.js";

import DatasetList from "../components/Dataset/DatasetList.jsx";
import Promised from "../components/Promised/Promised.jsx";


function mapStateToProps(state, ownProps) {

  return {
    datasets: state.datasets.items,
    errorLoading: (state.datasets.error !== null),
    errorLoadingMessage: "There was an error loading the datasets!",
    hasData: (state.datasets.items !== null),
    isLoading: state.datasets.isLoading,
  };
}

function mapStateToDispatch(dispatch) {
  return {
    onDatasetClick: (id, args = {}) => {
      dispatch(navigateTo("dataset", id, args));
    }
  };
}



export default connect(mapStateToProps, mapStateToDispatch)(Promised(DatasetList));
