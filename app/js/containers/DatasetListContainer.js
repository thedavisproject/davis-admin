import R from "ramda";
import { connect } from "react-redux";

import { navigateTo } from "../redux/routing/routing-actions.js";

import DatasetList from "../components/Dataset/DatasetList.jsx";

const datasets = R.times(R.identity, 6);

function mapStateToProps(state, ownProps) {
  return {
    datasets: datasets
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
