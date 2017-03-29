import { connect } from "react-redux";

import App from "../components/App.jsx";

function mapStateToProps(state, ownProps) {
  return {
    pageId: state.route.page
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
