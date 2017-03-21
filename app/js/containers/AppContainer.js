import { connect } from "react-redux";

import App from "../components/App.jsx";

function mapStateToProps(state, ownProps) {
  return {
    pageId: state.route.page
  };
}

function mapStateToDispatch(dispatch) {
  return {};
}


export default connect(mapStateToProps, mapStateToDispatch)(App)
