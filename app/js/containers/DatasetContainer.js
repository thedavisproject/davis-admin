import R from "ramda";
import { connect } from "react-redux";

import Dataset from "../components/Dataset/Dataset.jsx";
import Promised from "../components/Promised/Promised.jsx";


function mapStateToProps(state, ownProps) {

  const routeArgs = R.omit(["page", "id"], state.route);

  return {
    dataset: state.dataset.item,
    isLoading: state.dataset.isLoading,
    hasData: state.dataset.item !== null,
    errorLoading: state.dataset.error !== null,
    errorLoadingMessage: "There was an error loading the dataset!",
    ...routeArgs
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}


export default connect(mapStateToProps, mapDispatchToProps)(Promised(Dataset));
