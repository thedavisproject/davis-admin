import R from "ramda";
import { connect } from "react-redux";

import { navigateTo } from "../redux/routing/routing-actions.js";

import VariableList from "../components/Variable/VariableList.jsx";

const variables = R.times(R.identity, 20);

function mapStateToProps(state, ownProps) {
  return {
    variables: variables
  };
}

function mapStateToDispatch(dispatch) {
  return {
    onVariableClick: (id) => {
      dispatch(navigateTo("variable", id));
    }
  };
}


export default connect(mapStateToProps, mapStateToDispatch)(VariableList);
