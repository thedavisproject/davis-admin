import { connect } from "react-redux";

import App from "../components/App.jsx";

function mapStateToProps(state, ownProps) {
  return {
    route: state.route
  };
}

function mapStateToDispatch(dispatch) {
  return {};
}


export default connect(mapStateToProps, mapStateToDispatch)(App)
