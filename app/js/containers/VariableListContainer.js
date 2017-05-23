import R from "ramda";
import { connect } from "react-redux";

import VariableList from "../components/Variable/VariableList.jsx";
import Fetchable from "../components/Fetchable/Fetchable.jsx";


function mapStateToProps(state, ownProps) {
  return {
    errorLoading: !R.isNil(state.variables.error),
    errorLoadingMessage: "There was an error loading the variables!",
    hasData: !R.isNil(state.variables.data),
    isLoading: state.variables.isLoading,
    variables: state.variables.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}


export default connect(mapStateToProps, mapDispatchToProps)(Fetchable(VariableList));
