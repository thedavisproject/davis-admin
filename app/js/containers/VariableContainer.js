import R from "ramda";
import { connect } from "react-redux";

import Variable from "../components/Variable/Variable.jsx";
import Fetchable from "../components/Fetchable/Fetchable.jsx";


function mapStateToProps(state, ownProps) {

  const routeArgs = R.omit(["page", "id"], state.route);

  return {
    errorLoading: !R.isNil(state.variable.error),
    errorLoadingMessage: "There was an error loading the variable!",
    hasData: !R.isNil(state.variable.data),
    isLoading: state.variable.isLoading,
    variable: state.variable.data,
    ...routeArgs
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}


export default connect(mapStateToProps, mapDispatchToProps)(Fetchable(Variable));
