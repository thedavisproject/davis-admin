import R from "ramda";
import { connect } from "react-redux";

import { navigateTo } from "../redux/routing/routing-actions.js";

import Dataset from "../components/Dataset/Dataset.jsx";



function mapStateToProps(state, ownProps) {

  const route = state.route;

  // TODO get dataset from redux

  return {
    dataset: { id: route.id }
  };
}

function mapStateToDispatch(dispatch) {
  return {
    onDatasetClick: (id, args) => {
      dispatch(navigateTo("dataset", id, args));
    }
  };
}


export default connect(mapStateToProps, mapStateToDispatch)(Dataset);
