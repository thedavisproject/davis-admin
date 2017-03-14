import R from "ramda";
import { connect } from "react-redux";

import { navigateTo } from "../redux/routing/routing-actions.js";

import DatasetList from "../components/Dataset/DatasetList.jsx";


function mapStateToProps(state, ownProps) {
  return {
    datasets: state.datasets.items,
    isLoading: state.datasets.isLoading
  };
}

function mapStateToDispatch(dispatch) {
  return {
    onDatasetClick: (id, args) => {
      dispatch(navigateTo("dataset", id, args));
    }
  };
}


export default connect(mapStateToProps, mapStateToDispatch)(DatasetList);
