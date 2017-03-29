import { connect } from "react-redux";

import Variable from "../components/Variable/Variable.jsx";
import Promised from "../components/Promised/Promised.jsx";


function mapStateToProps(state, ownProps) {

  const { page, id, ...routeArgs } = state.route;

  return {
    variable: state.variable.item,
    isLoading: state.variable.isLoading,
    hasData: state.variable.item !== null,
    errorLoading: state.variable.error !== null,
    errorLoadingMessage: "There was an error loading the variable!",
    ...routeArgs
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}


export default connect(mapStateToProps, mapDispatchToProps)(Promised(Variable));
