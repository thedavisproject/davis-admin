import { connect } from "react-redux";

import VariableList from "../components/Variable/VariableList.jsx";
import Promised from "../components/Promised/Promised.jsx";


function mapStateToProps(state, ownProps) {
  return {
    variables: state.variables.items,
    errorLoading: (state.variables.error !== null),
    errorLoadingMessage: "There was an error loading the variables!",
    hasData: (state.variables.items !== null),
    isLoading: state.variables.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}


export default connect(mapStateToProps, mapDispatchToProps)(Promised(VariableList));
