import { connect } from "react-redux";

import Dataset from "../components/Dataset/Dataset.jsx";
import Promised from "../components/Promised/Promised.jsx";


function mapStateToProps(state, ownProps) {

  return {
    dataset: state.dataset.item,
    isLoading: state.dataset.isLoading,
    hasData: state.dataset.item !== null,
    errorLoading: state.dataset.error !== null,
    errorLoadingMessage: "There was an error loading the dataset!"
  };
}

function mapStateToDispatch(dispatch) {
  return {
  };
}


export default connect(mapStateToProps, mapStateToDispatch)(Promised(Dataset));
